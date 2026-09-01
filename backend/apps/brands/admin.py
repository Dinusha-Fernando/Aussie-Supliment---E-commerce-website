from django.contrib import admin
from apps.brands.models import Brand

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'origin_country', 'is_featured', 'website', 'created_at')
    list_filter = ('origin_country', 'is_featured')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
