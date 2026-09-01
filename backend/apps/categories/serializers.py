from rest_framework import serializers
from apps.categories.models import Category, Subcategory

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ('id', 'name', 'slug', 'description', 'order')


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True, read_only=True)
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'description', 'icon_name', 'image_url', 'is_featured', 'order', 'subcategories', 'product_count')

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()
