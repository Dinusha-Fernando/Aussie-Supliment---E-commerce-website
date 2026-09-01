from django.contrib import admin
from apps.wholesale.models import WholesaleTier, WholesaleApplication, WholesalePrice

@admin.register(WholesaleTier)
class WholesaleTierAdmin(admin.ModelAdmin):
    list_display = ('name', 'discount_percentage', 'min_order_value')

@admin.register(WholesaleApplication)
class WholesaleApplicationAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'abn', 'contact_name', 'email', 'phone', 'business_type', 'status', 'created_at')
    list_filter = ('status', 'business_type')
    search_fields = ('business_name', 'abn', 'email', 'contact_name')

@admin.register(WholesalePrice)
class WholesalePriceAdmin(admin.ModelAdmin):
    list_display = ('product', 'tier', 'min_quantity', 'unit_price')
    list_filter = ('tier',)
    search_fields = ('product__name', 'product__sku')
