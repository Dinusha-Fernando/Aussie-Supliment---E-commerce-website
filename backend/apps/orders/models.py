import uuid
from typing import ClassVar
from django.db import models
from apps.accounts.models import User
from apps.products.models import Product

class Order(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()

    class OrderType(models.TextChoices):
        RETAIL = 'RETAIL', 'Retail B2C'
        WHOLESALE = 'WHOLESALE', 'Wholesale B2B'

    class OrderStatus(models.TextChoices):
        PENDING = 'PENDING', 'Pending Payment'
        CONFIRMED = 'CONFIRMED', 'Order Confirmed'
        PROCESSING = 'PROCESSING', 'Processing & Packing'
        SHIPPED = 'SHIPPED', 'Dispatched / In Transit'
        DELIVERED = 'DELIVERED', 'Delivered'
        CANCELLED = 'CANCELLED', 'Cancelled'
        REFUNDED = 'REFUNDED', 'Refunded'

    class PaymentStatus(models.TextChoices):
        UNPAID = 'UNPAID', 'Unpaid'
        PAID = 'PAID', 'Paid'
        FAILED = 'FAILED', 'Payment Failed'
        REFUNDED = 'REFUNDED', 'Refunded'

    class ShippingMethod(models.TextChoices):
        STANDARD = 'STANDARD', 'Standard Island-Wide Tracked Courier'
        EXPRESS = 'EXPRESS', 'Colombo Express Priority Dispatch'
        PALLET_FREIGHT = 'PALLET_FREIGHT', 'Commercial Gym Wholesale Freight'

    order_number = models.CharField(max_length=50, unique=True, db_index=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    order_type = models.CharField(max_length=20, choices=OrderType.choices, default=OrderType.RETAIL)
    status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.CONFIRMED)
    
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    shipping_fee = models.DecimalField(max_digits=10, decimal_places=2, default=9.95)
    tax_gst = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    coupon_code = models.CharField(max_length=50, blank=True, null=True)

    # Customer & Shipping details
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=30)
    shipping_first_name = models.CharField(max_length=100)
    shipping_last_name = models.CharField(max_length=100)
    company_name = models.CharField(max_length=150, blank=True, null=True)
    street_address = models.CharField(max_length=255)
    apartment = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50) # District/Province (Colombo, Kandy, Galle, etc.)
    postcode = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default='Sri Lanka')
    
    shipping_method = models.CharField(max_length=30, choices=ShippingMethod.choices, default=ShippingMethod.STANDARD)
    tracking_number = models.CharField(max_length=100, blank=True, null=True)
    carrier = models.CharField(max_length=100, default='Island-Wide Express Courier (Colombo Hub)')

    payment_status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PAID)
    payment_method = models.CharField(max_length=50, default='Credit Card (Stripe)')
    payment_reference = models.CharField(max_length=100, blank=True, null=True)
    
    customer_notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.order_number:
            prefix = "WHOLESALE" if self.order_type == self.OrderType.WHOLESALE else "AUS"
            self.order_number = f"{prefix}-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order #{self.order_number} ({self.customer_email}) - ${self.total_amount}"


class OrderItem(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name = models.CharField(max_length=255)
    sku = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity}x {self.product_name} in {self.order.order_number}"
