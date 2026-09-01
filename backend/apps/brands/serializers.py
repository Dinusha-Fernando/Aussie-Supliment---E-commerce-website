from rest_framework import serializers
from apps.brands.models import Brand

class BrandSerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = ('id', 'name', 'slug', 'description', 'logo_url', 'banner_url', 'origin_country', 'is_featured', 'website', 'product_count')

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()
