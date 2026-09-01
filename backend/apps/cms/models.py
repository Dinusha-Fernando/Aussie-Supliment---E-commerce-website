from typing import ClassVar
from decimal import Decimal
from django.db import models

class SiteConfig(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()

    site_name = models.CharField(max_length=150, default="Aussie Supplements")
    tagline = models.CharField(max_length=255, default="Pure Australian Nutrition • Clinical Performance")
    
    # Announcement Bar
    announcement_text = models.CharField(
        max_length=300, 
        default="🇦🇺 FREE EXPRESS SHIPPING ACROSS AUSTRALIA ON ORDERS OVER $100 • 100% VICTORIAN DAIRY"
    )
    announcement_enabled = models.BooleanField(default=True)
    announcement_link = models.CharField(max_length=200, default="/shop", blank=True)
    
    # Financial & Currency Control
    free_shipping_threshold = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('100.00'))
    default_currency = models.CharField(max_length=10, default="LKR", help_text="LKR, USD, or AUD")
    lkr_multiplier = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('200.00'), help_text="1 AUD to LKR multiplier")
    usd_multiplier = models.DecimalField(max_digits=10, decimal_places=4, default=Decimal('0.6500'), help_text="1 AUD to USD multiplier")
    aud_multiplier = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('1.00'))
    
    # Support & Contact
    contact_email = models.EmailField(default="support@aussiesupplements.com.au")
    contact_phone = models.CharField(max_length=50, default="1300 892 877")
    warehouse_location = models.CharField(max_length=255, default="Melbourne Distribution Hub, Victoria, Australia")
    
    # Store Controls
    is_store_open = models.BooleanField(default=True)
    maintenance_mode = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Configuration'
        verbose_name_plural = 'Site Configuration'

    def __str__(self):
        return f"{self.site_name} Configuration (Updated: {self.updated_at.strftime('%Y-%m-%d %H:%M')})"

    @classmethod
    def get_solo(cls):
        obj, _ = cls.objects.get_or_create(id=1)
        return obj


class HeroSlide(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()

    title = models.CharField(max_length=200, default='Aussie Pure 100% Grass-Fed WPI')
    tagline = models.CharField(max_length=200, default='Single-Origin Victorian Pasture Isolate')
    hero_title = models.CharField(max_length=200, default='BIO-ACTIVE WHEY ISOLATE')
    subline = models.TextField(default='Cold micro-filtered from free-roaming Gippsland dairy cows. 27.4g pure bioactive protein with zero artificial sweeteners, gums, or fillers.')
    size_servings = models.CharField(max_length=100, default='2kg Tub • 66 Servings')
    retail_price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('89.95'))
    wholesale_price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('58.50'))
    image_url = models.CharField(max_length=500, default='/assets/hero-tub.jpg')
    halo_gradient = models.CharField(max_length=200, default='from-emerald-500/30 via-gold-500/25 to-amber-500/20')
    glow_shadow = models.CharField(max_length=200, default='shadow-[0_0_80px_rgba(229,169,60,0.35)]')
    tab_label = models.CharField(max_length=100, default='1. Grass-Fed WPI 2kg')
    slug = models.CharField(max_length=200, default='aussie-pure-grass-fed-whey-protein-isolate-2kg')
    
    badge_top_value = models.CharField(max_length=50, default='27.4g')
    badge_top_label = models.CharField(max_length=100, default='Pure Protein')
    badge_top_sub = models.CharField(max_length=100, default='Per Single Serve')
    badge_bottom_title = models.CharField(max_length=100, default='Victorian Dairy')
    badge_bottom_subtitle = models.CharField(max_length=100, default='100% Pasture Fed')
    badge_rating_score = models.CharField(max_length=20, default='4.98')
    badge_rating_count = models.CharField(max_length=100, default='1,240+ Verified Reviews')
    
    hotspots = models.JSONField(default=list, blank=True, help_text="Array of hotspot objects {x, y, title, detail}")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Hero Slide'
        verbose_name_plural = 'Hero Slides'

    def __str__(self):
        return f"Slide #{self.order + 1}: {self.title} (${self.retail_price})"


class DiagnosticQuizQuestion(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()

    step_number = models.PositiveIntegerField(default=1)
    question_text = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    options = models.JSONField(default=list, help_text="Array of {id, title, desc, icon, category_slug}")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'step_number']
        verbose_name = 'Quiz Question'
        verbose_name_plural = 'Quiz Questions'

    def __str__(self):
        return f"Step {self.step_number}: {self.question_text}"


class TrustPillar(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()

    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=150)
    icon_type = models.CharField(max_length=50, default='ShieldCheck', help_text="ShieldCheck, Leaf, Truck, Flag")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name = 'Trust Pillar'
        verbose_name_plural = 'Trust Pillars'

    def __str__(self):
        return f"{self.title} - {self.subtitle}"
