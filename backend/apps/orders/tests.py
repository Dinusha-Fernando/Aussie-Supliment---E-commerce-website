from rest_framework.test import APITestCase
from rest_framework import status
from apps.brands.models import Brand
from apps.categories.models import Category
from apps.products.models import Product
from apps.coupons.models import Coupon

class OrdersAPITests(APITestCase):
    def setUp(self):
        self.brand = Brand.objects.create(name='Aussie Pure', slug='aussie-pure')
        self.category = Category.objects.create(name='Protein', slug='protein')
        self.product = Product.objects.create(
            name='Grass-Fed WPI 2kg',
            slug='grass-fed-wpi-2kg',
            sku='APN-WPI-2KG',
            brand=self.brand,
            category=self.category,
            retail_price=89.95,
            wholesale_price=58.50,
            stock_quantity=100
        )
        self.coupon = Coupon.objects.create(
            code='WELCOME10',
            discount_type=Coupon.DiscountType.PERCENTAGE,
            discount_value=10.00,
            min_spend=50.00,
            is_active=True
        )

    def test_order_creation_with_coupon(self):
        url = '/api/orders/create/'
        data = {
            'customer_email': 'buyer@example.com.au',
            'customer_phone': '0412345678',
            'shipping_first_name': 'Sarah',
            'shipping_last_name': 'Miller',
            'street_address': '42 Pitt Street',
            'city': 'Sydney',
            'state': 'NSW',
            'postcode': '2000',
            'shipping_method': 'STANDARD',
            'payment_method': 'Credit Card (Stripe)',
            'coupon_code': 'WELCOME10',
            'items': [
                {
                    'product_id': self.product.id,
                    'quantity': 2,
                    'is_wholesale': False
                }
            ]
        }
        res = self.client.post(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIn('order_number', res.data)
        self.assertGreater(float(res.data['discount_amount']), 0)

    def test_stripe_config(self):
        url = '/api/orders/stripe-config/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('publishableKey', res.data)

    def test_payment_intent_creation(self):
        url = '/api/orders/create-payment-intent/'
        data = {
            'total_amount': 150.00,
            'currency': 'aud',
            'customer_email': 'buyer@example.com.au'
        }
        res = self.client.post(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('clientSecret', res.data)
