from rest_framework import serializers
from apps.reviews.models import Review, ReviewImage, ReviewResponse, ReviewVote, ReviewReport
from apps.orders.models import Order, OrderItem

class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = ('id', 'image_url', 'alt_text', 'created_at')


class ReviewResponseSerializer(serializers.ModelSerializer):
    admin_name = serializers.SerializerMethodField()

    class Meta:
        model = ReviewResponse
        fields = ('id', 'admin_name', 'content', 'created_at')

    def get_admin_name(self, obj):
        return "Aussie Supplements Team" if not obj.admin else f"{obj.admin.first_name or 'Aussie Supplements'} (Official Response)"


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    images = ReviewImageSerializer(many=True, read_only=True)
    response = ReviewResponseSerializer(read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_slug = serializers.CharField(source='product.slug', read_only=True)

    class Meta:
        model = Review
        fields = (
            'id', 'user_name', 'product', 'product_name', 'product_slug', 'rating', 'title', 'content',
            'is_verified_purchase', 'is_featured', 'status', 'helpful_count', 'not_helpful_count',
            'images', 'response', 'created_at'
        )

    def get_user_name(self, obj):
        if obj.user.first_name:
            last_initial = f" {obj.user.last_name[0]}." if obj.user.last_name else ""
            return f"{obj.user.first_name}{last_initial}"
        return obj.user.email.split('@')[0].capitalize()


class ReviewCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.URLField(),
        required=False,
        write_only=True
    )

    class Meta:
        model = Review
        fields = ('product', 'rating', 'title', 'content', 'images')

    def create(self, validated_data):
        user = self.context['request'].user
        product = validated_data['product']
        images_data = validated_data.pop('images', [])

        # Check if verified purchase (user has at least 1 delivered/confirmed order with this product)
        has_purchased = OrderItem.objects.filter(
            order__user=user,
            product=product,
            order__status__in=[Order.OrderStatus.CONFIRMED, Order.OrderStatus.PROCESSING, Order.OrderStatus.SHIPPED, Order.OrderStatus.DELIVERED]
        ).exists()

        review = Review.objects.create(
            user=user,
            is_verified_purchase=has_purchased,
            status=Review.ReviewStatus.APPROVED,
            **validated_data
        )

        for img_url in images_data:
            ReviewImage.objects.create(review=review, image_url=img_url)

        review.update_product_rating()
        return review
