from rest_framework import serializers
from apps.wholesale.models import WholesaleTier, WholesaleApplication, WholesalePrice
from apps.products.models import Product

class WholesaleTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = WholesaleTier
        fields = '__all__'


class WholesaleApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = WholesaleApplication
        fields = '__all__'
        read_only_fields = ('user', 'status', 'assigned_tier', 'admin_notes', 'created_at', 'updated_at')


class WholesaleProductCatalogSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    primary_image = serializers.SerializerMethodField()
    tier_1_price = serializers.SerializerMethodField()
    tier_10_price = serializers.SerializerMethodField()
    tier_50_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'sku', 'brand_name', 'category_name', 'primary_image', 'size_label', 'flavour',
            'stock_quantity', 'retail_price', 'wholesale_price', 'tier_1_price', 'tier_10_price', 'tier_50_price'
        )

    def get_primary_image(self, obj):
        img = obj.images.filter(is_primary=True).first() or obj.images.first()
        return img.image_url if img else None

    def get_tier_1_price(self, obj):
        return float(obj.wholesale_price)

    def get_tier_10_price(self, obj):
        p = obj.wholesale_prices.filter(min_quantity__lte=10).order_by('-min_quantity').first()
        return float(p.unit_price) if p else round(float(obj.wholesale_price) * 0.92, 2)

    def get_tier_50_price(self, obj):
        p = obj.wholesale_prices.filter(min_quantity__gte=50).order_by('min_quantity').first()
        return float(p.unit_price) if p else round(float(obj.wholesale_price) * 0.85, 2)
