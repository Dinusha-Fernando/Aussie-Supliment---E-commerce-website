from typing import ClassVar
from decimal import Decimal
from django.db import models
from django.utils.text import slugify
from apps.brands.models import Brand
from apps.categories.models import Category, Subcategory

class Product(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()

    class FormChoices(models.TextChoices):
        POWDER = 'POWDER', 'Powder'
        CAPSULES = 'CAPSULES', 'Capsules'
        TABLETS = 'TABLETS', 'Tablets'
        GUMMIES = 'GUMMIES', 'Gummies'
        LIQUID = 'LIQUID', 'Liquid'

    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=280, unique=True, blank=True)
    sku = models.CharField(max_length=50, unique=True)
    barcode = models.CharField(max_length=50, blank=True, null=True)
    artg_number = models.CharField(max_length=50, blank=True, null=True, help_text="Australian Register of Therapeutic Goods (e.g. AUST L 384920)")
    
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')

    short_description = models.CharField(max_length=500, blank=True, null=True)
    description = models.TextField()
    
    retail_price = models.DecimalField(max_digits=10, decimal_places=2)
    compare_at_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    wholesale_price = models.DecimalField(max_digits=10, decimal_places=2)

    stock_quantity = models.PositiveIntegerField(default=100)
    low_stock_threshold = models.PositiveIntegerField(default=10)
    
    weight_grams = models.PositiveIntegerField(default=500, help_text="Weight in grams")
    size_label = models.CharField(max_length=100, default='1kg', help_text="e.g. 1kg, 500g, 120 Veg Caps")
    serving_size = models.CharField(max_length=100, default='30g')
    servings_per_container = models.PositiveIntegerField(default=30)
    form = models.CharField(max_length=20, choices=FormChoices.choices, default=FormChoices.POWDER)
    flavour = models.CharField(max_length=100, blank=True, null=True)
    
    dietary_tags = models.CharField(max_length=255, default='Australian Made, Gluten Free, Lab Tested', help_text="Comma-separated tags")
    goal = models.CharField(max_length=100, default='Muscle Building, Recovery, Everyday Wellness', help_text="Primary fitness/health goal")
    
    ingredients = models.TextField(blank=True, null=True)
    directions_for_use = models.TextField(blank=True, null=True)
    warnings = models.TextField(blank=True, null=True)
    storage_info = models.CharField(max_length=255, default='Store in a cool, dry place below 25°C away from direct sunlight.')

    is_featured = models.BooleanField(default=False)
    is_best_seller = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    rating_avg = models.DecimalField(max_digits=3, decimal_places=2, default=Decimal('5.00'))
    review_count = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', '-is_best_seller', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.sku})"

    @property
    def is_in_stock(self):
        return self.stock_quantity > 0

    @property
    def discount_percent(self):
        if self.compare_at_price and self.compare_at_price > self.retail_price:
            return round(((self.compare_at_price - self.retail_price) / self.compare_at_price) * 100)
        return 0


class ProductImage(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField(max_length=500)
    alt_text = models.CharField(max_length=255, blank=True, null=True)
    is_primary = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-is_primary', 'order']

    def __str__(self):
        return f"Image for {self.product.name}"


class NutritionFact(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='nutrition')
    serving_size_info = models.CharField(max_length=100, default='30g (1 Scoop)')
    energy_kj = models.CharField(max_length=50, default='495 kJ (118 Cal)')
    protein_g = models.CharField(max_length=50, default='25.4 g')
    fat_total_g = models.CharField(max_length=50, default='0.8 g')
    fat_saturated_g = models.CharField(max_length=50, default='0.4 g')
    carbs_total_g = models.CharField(max_length=50, default='1.2 g')
    carbs_sugars_g = models.CharField(max_length=50, default='0.6 g')
    sodium_mg = models.CharField(max_length=50, default='65 mg')
    custom_nutrients = models.JSONField(default=dict, blank=True, help_text="e.g. {'BCAA': '5.8g', 'Glutamine': '4.2g'}")

    def __str__(self):
        return f"Nutrition table for {self.product.name}"
