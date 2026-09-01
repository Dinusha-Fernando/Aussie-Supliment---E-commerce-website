from typing import ClassVar
from django.db import models
from apps.accounts.models import User
from apps.products.models import Product

class WholesaleTier(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    name = models.CharField(max_length=100) # e.g. "Tier 1 - Silver Gyms", "Tier 2 - Gold Retailers", "Tier 3 - Platinum Distributor"
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=20.00, help_text="Default discount % off retail")
    min_order_value = models.DecimalField(max_digits=10, decimal_places=2, default=500.00)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.discount_percentage}% off)"


class WholesaleApplication(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    class BusinessType(models.TextChoices):
        GYM = 'GYM', 'Gym / Fitness Facility'
        SUPPLEMENT_STORE = 'SUPPLEMENT_STORE', 'Supplement Store'
        HEALTH_STORE = 'HEALTH_STORE', 'Health & Wellness Shop'
        PHARMACY = 'PHARMACY', 'Pharmacy / Chemist'
        ONLINE_RETAILER = 'ONLINE_RETAILER', 'Online Retailer'
        PERSONAL_TRAINER = 'PERSONAL_TRAINER', 'Personal Trainer / Coach'
        SPORTS_CLUB = 'SPORTS_CLUB', 'Sports Club / Team'
        OTHER = 'OTHER', 'Other Commercial Entity'

    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending Review'
        UNDER_REVIEW = 'UNDER_REVIEW', 'Under Review'
        APPROVED = 'APPROVED', 'Approved'
        REJECTED = 'REJECTED', 'Rejected'
        SUSPENDED = 'SUSPENDED', 'Suspended'

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='wholesale_applications')
    business_name = models.CharField(max_length=200)
    abn = models.CharField(max_length=50, help_text="Australian Business Number (11 digits)")
    contact_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    business_type = models.CharField(max_length=30, choices=BusinessType.choices, default=BusinessType.GYM)
    website = models.URLField(blank=True, null=True)
    estimated_monthly_spend = models.CharField(max_length=100, default='$1,000 - $3,000')
    interested_categories = models.CharField(max_length=255, default='Protein, Pre-Workout, Vitamins, Amino Acids')
    message = models.TextField(blank=True, null=True)
    
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    assigned_tier = models.ForeignKey(WholesaleTier, on_delete=models.SET_NULL, null=True, blank=True)
    admin_notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.business_name} (ABN: {self.abn}) - {self.get_status_display()}"


class WholesalePrice(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='wholesale_prices')
    tier = models.ForeignKey(WholesaleTier, on_delete=models.CASCADE, related_name='product_prices', null=True, blank=True)
    min_quantity = models.PositiveIntegerField(default=1, help_text="Tier quantity (e.g. 1-9, 10-49, 50+)")
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ['product', 'min_quantity']

    def __str__(self):
        return f"{self.product.name} (Qty {self.min_quantity}+) @ ${self.unit_price}"
