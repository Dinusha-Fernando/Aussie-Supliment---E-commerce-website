from typing import ClassVar
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

class User(AbstractUser):
    objects: ClassVar[UserManager] = UserManager()

    class Role(models.TextChoices):
        RETAIL = 'RETAIL', 'Retail Customer'
        WHOLESALE = 'WHOLESALE', 'Wholesale Customer'
        MANAGER = 'MANAGER', 'Store Manager'
        ADMIN = 'ADMIN', 'Super Admin'

    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30, blank=True, null=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.RETAIL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"


class Address(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    class AddressType(models.TextChoices):
        SHIPPING = 'SHIPPING', 'Shipping Address'
        BILLING = 'BILLING', 'Billing Address'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    address_type = models.CharField(max_length=20, choices=AddressType.choices, default=AddressType.SHIPPING)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    company_name = models.CharField(max_length=150, blank=True, null=True)
    street_address = models.CharField(max_length=255)
    apartment = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50) # NSW, VIC, QLD, WA, SA, TAS, ACT, NT
    postcode = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default='Australia')
    phone = models.CharField(max_length=30, blank=True, null=True)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Addresses'

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.street_address}, {self.city} {self.state} {self.postcode}"
