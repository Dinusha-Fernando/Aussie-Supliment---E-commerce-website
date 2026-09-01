from django.contrib import admin
from .models import SiteConfig, HeroSlide, DiagnosticQuizQuestion, TrustPillar

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = (
        'site_name',
        'announcement_enabled',
        'announcement_text',
        'default_currency',
        'free_shipping_threshold',
        'is_store_open',
        'updated_at'
    )
    fieldsets = (
        ('General Branding', {
            'fields': ('site_name', 'tagline', 'is_store_open', 'maintenance_mode')
        }),
        ('Announcement Bar', {
            'fields': ('announcement_enabled', 'announcement_text', 'announcement_link')
        }),
        ('Currency & Pricing Multipliers', {
            'description': 'Configure live multi-currency rates used by the frontend storefront.',
            'fields': ('default_currency', 'free_shipping_threshold', 'lkr_multiplier', 'usd_multiplier', 'aud_multiplier')
        }),
        ('Contact & Logistics', {
            'fields': ('contact_email', 'contact_phone', 'warehouse_location')
        }),
    )

    def has_add_permission(self, request):
        # Only allow 1 singleton config
        return not SiteConfig.objects.exists()


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'tab_label',
        'retail_price',
        'wholesale_price',
        'order',
        'is_active'
    )
    list_editable = ('order', 'is_active', 'retail_price', 'wholesale_price')
    list_filter = ('is_active',)
    search_fields = ('title', 'tagline', 'hero_title')


@admin.register(DiagnosticQuizQuestion)
class DiagnosticQuizQuestionAdmin(admin.ModelAdmin):
    list_display = ('step_number', 'question_text', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('question_text',)


@admin.register(TrustPillar)
class TrustPillarAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'icon_type', 'order', 'is_active')
    list_editable = ('order', 'is_active')
