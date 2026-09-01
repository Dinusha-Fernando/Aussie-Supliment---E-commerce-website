from typing import ClassVar
from django.db import models
from apps.accounts.models import User
from apps.products.models import Product

class Cart(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='carts')
    session_id = models.CharField(max_length=255, blank=True, null=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.user:
            return f"Cart #{self.id} for {self.user.email}"
        return f"Guest Cart #{self.id} ({self.session_id})"

    @property
    def total_items(self):
        return sum(item.quantity for item in self.items.all())

    @property
    def subtotal(self):
        return sum(item.total_price for item in self.items.all())


class CartItem(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    is_wholesale = models.BooleanField(default=False)
    custom_unit_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('cart', 'product', 'is_wholesale')

    def __str__(self):
        return f"{self.quantity}x {self.product.name} in Cart #{self.cart_id}"

    @property
    def unit_price(self):
        if self.custom_unit_price:
            return self.custom_unit_price
        if self.is_wholesale:
            return self.product.wholesale_price
        return self.product.retail_price

    @property
    def total_price(self):
        return self.unit_price * self.quantity
