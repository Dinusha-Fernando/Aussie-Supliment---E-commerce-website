from decimal import Decimal
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from django.conf import settings
from apps.products.models import Product
from apps.categories.models import Category
from apps.brands.models import Brand
from apps.orders.models import Order, OrderItem

User = get_user_model()

class OWASPSecurityTestSuite(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create Category & Brand
        self.category = Category.objects.create(name="Protein", slug="protein")
        self.brand = Brand.objects.create(name="Tasman Performance", slug="tasman-performance")

        # Create Product with distinct retail and wholesale prices
        self.product = Product.objects.create(
            name="Tasman WPI 1KG",
            slug="tasman-wpi-1kg",
            sku="TP-WPI-1KG",
            retail_price=Decimal("75.00"),
            wholesale_price=Decimal("42.00"),
            stock_quantity=10,
            category=self.category,
            brand=self.brand
        )

        # Create Retail Customer A
        self.user_a = User.objects.create_user(
            username="customer_a@example.com",
            email="customer_a@example.com",
            password="SecurePassword123!",
            role=User.Role.RETAIL
        )

        # Create Retail Customer B
        self.user_b = User.objects.create_user(
            username="customer_b@example.com",
            email="customer_b@example.com",
            password="SecurePassword123!",
            role=User.Role.RETAIL
        )

        # Create Order for User B
        self.order_b = Order.objects.create(
            order_number="AUS-USER-B-100",
            user=self.user_b,
            customer_email=self.user_b.email,
            customer_phone="0412345678",
            shipping_first_name="Bob",
            shipping_last_name="Smith",
            street_address="100 Melbourne Rd",
            city="Melbourne",
            state="VIC",
            postcode="3000",
            subtotal=Decimal("75.00"),
            shipping_fee=Decimal("9.95"),
            total_amount=Decimal("84.95")
        )

    # ─────────────────────────────────────────────────────────────
    # TEST 1: IDOR / BOLA - Customer A attempts to read Customer B's order
    # ─────────────────────────────────────────────────────────────
    def test_idor_prevented_between_authenticated_users(self):
        self.client.force_authenticate(user=self.user_a)
        response = self.client.get(f'/api/orders/lookup/{self.order_b.order_number}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn("Forbidden", str(response.data))

    # ─────────────────────────────────────────────────────────────
    # TEST 2: IDOR / BOLA - Unauthenticated Guest Enumeration Protection
    # ─────────────────────────────────────────────────────────────
    def test_guest_cannot_enumerate_order_without_matching_email(self):
        # Request without email query param
        response = self.client.get(f'/api/orders/lookup/{self.order_b.order_number}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Request with mismatched email query param
        response = self.client.get(f'/api/orders/lookup/{self.order_b.order_number}/?email=hacker@evil.com')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Request with matching email succeeds
        response = self.client.get(f'/api/orders/lookup/{self.order_b.order_number}/?email={self.user_b.email}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # ─────────────────────────────────────────────────────────────
    # TEST 3: Business Logic - Price Tampering Attack
    # ─────────────────────────────────────────────────────────────
    def test_price_tampering_ignored_server_authoritative(self):
        # Client tries to inject unit_price = $1.00 for a $75.00 item
        payload = {
            'customer_email': 'buyer@example.com',
            'customer_phone': '0400000000',
            'shipping_first_name': 'Alice',
            'shipping_last_name': 'Wonder',
            'street_address': '123 Fake St',
            'city': 'Sydney',
            'state': 'NSW',
            'postcode': '2000',
            'shipping_method': 'STANDARD',
            'items': [{
                'product_id': self.product.id,
                'quantity': 1,
                'unit_price': 1.00 # Malicious price
            }]
        }
        response = self.client.post('/api/orders/create/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Server must calculate authoritative price ($75.00 + $9.95 shipping = $84.95)
        self.assertEqual(Decimal(str(response.data['subtotal'])), Decimal("75.00"))
        self.assertEqual(Decimal(str(response.data['total_amount'])), Decimal("84.95"))

    # ─────────────────────────────────────────────────────────────
    # TEST 4: Authorization - Wholesale Pricing Injection by Retail User
    # ─────────────────────────────────────────────────────────────
    def test_retail_user_cannot_claim_wholesale_pricing(self):
        self.client.force_authenticate(user=self.user_a)
        payload = {
            'customer_email': self.user_a.email,
            'customer_phone': '0400000000',
            'shipping_first_name': 'Alice',
            'shipping_last_name': 'Retailer',
            'street_address': '123 Fake St',
            'city': 'Sydney',
            'state': 'NSW',
            'postcode': '2000',
            'shipping_method': 'STANDARD',
            'items': [{
                'product_id': self.product.id,
                'quantity': 1,
                'is_wholesale': True # Maliciously claiming wholesale price ($42 instead of $75)
            }]
        }
        response = self.client.post('/api/orders/create/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Must be charged full retail price ($75.00), not wholesale ($42.00)
        self.assertEqual(Decimal(str(response.data['subtotal'])), Decimal("75.00"))

    # ─────────────────────────────────────────────────────────────
    # TEST 5: Business Logic - Negative Quantity Attack
    # ─────────────────────────────────────────────────────────────
    def test_negative_quantity_rejected(self):
        payload = {
            'customer_email': 'buyer@example.com',
            'customer_phone': '0400000000',
            'shipping_first_name': 'Alice',
            'shipping_last_name': 'Wonder',
            'street_address': '123 Fake St',
            'city': 'Sydney',
            'state': 'NSW',
            'postcode': '2000',
            'items': [{
                'product_id': self.product.id,
                'quantity': -5
            }]
        }
        response = self.client.post('/api/orders/create/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # ─────────────────────────────────────────────────────────────
    # TEST 6: Inventory Overselling Attack
    # ─────────────────────────────────────────────────────────────
    def test_overselling_rejected_when_stock_exceeded(self):
        payload = {
            'customer_email': 'buyer@example.com',
            'customer_phone': '0400000000',
            'shipping_first_name': 'Alice',
            'shipping_last_name': 'Wonder',
            'street_address': '123 Fake St',
            'city': 'Sydney',
            'state': 'NSW',
            'postcode': '2000',
            'items': [{
                'product_id': self.product.id,
                'quantity': 999 # Stock is only 10
            }]
        }
        response = self.client.post('/api/orders/create/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # ─────────────────────────────────────────────────────────────
    # TEST 7: Mass Assignment / Privilege Escalation Attack
    # ─────────────────────────────────────────────────────────────
    def test_cannot_self_assign_admin_role_during_registration(self):
        payload = {
            'email': 'hacker@attacker.com',
            'password': 'StrongPassword123!',
            'role': 'ADMIN' # Attacker tries to create an admin account
        }
        response = self.client.post('/api/auth/register/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        created_user = User.objects.get(email='hacker@attacker.com')
        # Role must be sanitized to RETAIL, never ADMIN
        self.assertEqual(created_user.role, User.Role.RETAIL)
        self.assertFalse(created_user.is_staff)
        self.assertFalse(created_user.is_superuser)

    # ─────────────────────────────────────────────────────────────
    # TEST 8: Security Misconfiguration - CORS Allowlist Enforcement
    # ─────────────────────────────────────────────────────────────
    def test_cors_allow_all_origins_disabled(self):
        self.assertFalse(getattr(settings, 'CORS_ALLOW_ALL_ORIGINS', True))
        self.assertIn('http://localhost:3000', getattr(settings, 'CORS_ALLOWED_ORIGINS', []))

    # ─────────────────────────────────────────────────────────────
    # TEST 9: Security Headers Configuration
    # ─────────────────────────────────────────────────────────────
    def test_security_headers_configured(self):
        self.assertEqual(getattr(settings, 'X_FRAME_OPTIONS', ''), 'DENY')
        self.assertTrue(getattr(settings, 'SECURE_CONTENT_TYPE_NOSNIFF', False))
        self.assertTrue(getattr(settings, 'SECURE_BROWSER_XSS_FILTER', False))
        self.assertTrue(getattr(settings, 'SESSION_COOKIE_HTTPONLY', False))
