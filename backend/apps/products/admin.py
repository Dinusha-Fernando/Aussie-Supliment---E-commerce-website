from django.contrib import admin
from apps.products.models import Product, ProductImage, NutritionFact

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 2

class NutritionFactInline(admin.StackedInline):
    model = NutritionFact
    can_delete = False

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'sku', 'brand', 'category', 'retail_price', 'wholesale_price', 'stock_quantity', 'rating_avg', 'is_best_seller', 'is_featured', 'is_active')
    list_filter = ('brand', 'category', 'form', 'is_best_seller', 'is_featured', 'is_active')
    search_fields = ('name', 'sku', 'artg_number', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, NutritionFactInline]
