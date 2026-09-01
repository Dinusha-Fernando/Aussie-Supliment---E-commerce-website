from typing import ClassVar
from django.db import models
from django.utils import timezone

class Coupon(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()

    class DiscountType(models.TextChoices):
        PERCENTAGE = 'PERCENTAGE', 'Percentage Discount'
        FIXED = 'FIXED', 'Fixed Amount Discount (AUD)'

    code = models.CharField(max_length=50, unique=True)
    discount_type = models.CharField(max_length=20, choices=DiscountType.choices, default=DiscountType.PERCENTAGE)
    discount_value = models.DecimalField(max_digits=10, decimal_places=2) # e.g. 10.00 for 10% or $10 off
    min_spend = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    max_discount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    usage_limit = models.PositiveIntegerField(null=True, blank=True)
    times_used = models.PositiveIntegerField(default=0)
    
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.code} ({self.discount_value}{'%' if self.discount_type == self.DiscountType.PERCENTAGE else '$'} off)"

    def is_valid_for_amount(self, subtotal):
        from decimal import Decimal
        subtotal_dec = Decimal(str(subtotal))
        if not self.is_active:
            return False, "This coupon is inactive."
        now = timezone.now()
        if self.start_date and now < self.start_date:
            return False, "This coupon has not started yet."
        if self.end_date and now > self.end_date:
            return False, "This coupon has expired."
        if self.usage_limit and self.times_used >= self.usage_limit:
            return False, "This coupon has reached its usage limit."
        if subtotal_dec < self.min_spend:
            return False, f"Minimum spend of ${self.min_spend} required."
        return True, "Valid"

    def calculate_discount(self, subtotal):
        from decimal import Decimal
        subtotal_dec = Decimal(str(subtotal))
        if self.discount_type == self.DiscountType.PERCENTAGE:
            discount = (subtotal_dec * self.discount_value) / Decimal('100')
            if self.max_discount:
                discount = min(discount, self.max_discount)
            return round(discount, 2)
        else:
            return round(min(self.discount_value, subtotal_dec), 2)

