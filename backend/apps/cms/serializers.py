from rest_framework import serializers
from .models import SiteConfig, HeroSlide, DiagnosticQuizQuestion, TrustPillar

class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = [
            'site_name',
            'tagline',
            'announcement_text',
            'announcement_enabled',
            'announcement_link',
            'free_shipping_threshold',
            'default_currency',
            'lkr_multiplier',
            'usd_multiplier',
            'aud_multiplier',
            'contact_email',
            'contact_phone',
            'warehouse_location',
            'is_store_open',
            'maintenance_mode',
            'updated_at',
        ]


class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = [
            'id',
            'title',
            'tagline',
            'hero_title',
            'subline',
            'size_servings',
            'retail_price',
            'wholesale_price',
            'image_url',
            'halo_gradient',
            'glow_shadow',
            'tab_label',
            'slug',
            'badge_top_value',
            'badge_top_label',
            'badge_top_sub',
            'badge_bottom_title',
            'badge_bottom_subtitle',
            'badge_rating_score',
            'badge_rating_count',
            'hotspots',
            'order',
            'is_active',
        ]


class DiagnosticQuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosticQuizQuestion
        fields = ['id', 'step_number', 'question_text', 'subtitle', 'options', 'order', 'is_active']


class TrustPillarSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrustPillar
        fields = ['id', 'title', 'subtitle', 'icon_type', 'order', 'is_active']
