from rest_framework import serializers
from apps.products.models import Product, ProductImage, NutritionFact
from apps.brands.serializers import BrandSerializer
from apps.categories.serializers import CategorySerializer, SubcategorySerializer

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image_url', 'alt_text', 'is_primary', 'order')


class NutritionFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutritionFact
        fields = '__all__'


class ProductListSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    primary_image = serializers.SerializerMethodField()
    discount_percent = serializers.IntegerField(read_only=True)
    is_in_stock = serializers.BooleanField(read_only=True)

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'slug', 'sku', 'artg_number', 'brand_name', 'category_name', 'category_slug',
            'short_description', 'retail_price', 'compare_at_price', 'wholesale_price', 'discount_percent',
            'stock_quantity', 'is_in_stock', 'size_label', 'serving_size', 'form', 'flavour', 'goal',
            'dietary_tags', 'is_featured', 'is_best_seller', 'rating_avg', 'review_count', 'primary_image'
        )

    def get_primary_image(self, obj):
        img = obj.images.filter(is_primary=True).first() or obj.images.first()
        return img.image_url if img else None


class ProductDetailSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    subcategory = SubcategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    nutrition = NutritionFactSerializer(read_only=True)
    discount_percent = serializers.IntegerField(read_only=True)
    is_in_stock = serializers.BooleanField(read_only=True)
    wholesale_pricing_tiers = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_wholesale_pricing_tiers(self, obj):
        tiers = obj.wholesale_prices.all()
        return [
            {
                'min_quantity': tier.min_quantity,
                'unit_price': float(tier.unit_price)
            }
            for tier in tiers
        ]


class ProductAdminWriteSerializer(serializers.ModelSerializer):
    image_urls = serializers.ListField(child=serializers.URLField(), required=False, write_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        image_urls = validated_data.pop('image_urls', [])
        product = Product.objects.create(**validated_data)
        for i, url in enumerate(image_urls):
            ProductImage.objects.create(
                product=product,
                image_url=url,
                is_primary=(i == 0),
                order=i + 1
            )
        return product

    def update(self, instance, validated_data):
        image_urls = validated_data.pop('image_urls', None)
        for attr, val in validated_data.items():
            setattr(instance, attr, val)
        instance.save()

        if image_urls is not None:
            instance.images.all().delete()
            for i, url in enumerate(image_urls):
                ProductImage.objects.create(
                    product=instance,
                    image_url=url,
                    is_primary=(i == 0),
                    order=i + 1
                )
        return instance
