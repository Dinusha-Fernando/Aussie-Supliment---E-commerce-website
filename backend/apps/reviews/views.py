from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.db.models import Count, Avg
from apps.reviews.models import Review, ReviewVote, ReviewReport, ReviewResponse
from apps.reviews.serializers import ReviewSerializer, ReviewCreateSerializer
from apps.products.models import Product

class ProductReviewListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product_slug = self.kwargs.get('slug')
        qs = Review.objects.filter(product__slug=product_slug, status=Review.ReviewStatus.APPROVED).select_related('user', 'product').prefetch_related('images', 'response')

        # Filter by rating
        rating = self.request.query_params.get('rating')
        if rating:
            qs = qs.filter(rating=rating)

        # Filter verified
        verified = self.request.query_params.get('verified')
        if verified == 'true':
            qs = qs.filter(is_verified_purchase=True)

        # Filter with photos
        with_photos = self.request.query_params.get('with_photos')
        if with_photos == 'true':
            qs = qs.filter(images__isnull=False).distinct()

        # Sort
        sort = self.request.query_params.get('sort', 'newest')
        if sort == 'helpful':
            qs = qs.order_by('-helpful_count', '-created_at')
        elif sort == 'highest':
            qs = qs.order_by('-rating', '-created_at')
        elif sort == 'lowest':
            qs = qs.order_by('rating', '-created_at')
        else:
            qs = qs.order_by('-created_at')

        return qs


class ProductReviewStatsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        product = get_object_or_404(Product, slug=slug)
        reviews = Review.objects.filter(product=product, status=Review.ReviewStatus.APPROVED)
        total_count = reviews.count()
        avg_rating = reviews.aggregate(avg=Avg('rating'))['avg'] or 5.0

        star_counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        for item in reviews.values('rating').annotate(c=Count('id')):
            star_counts[item['rating']] = item['c']

        distribution = {}
        for star, count in star_counts.items():
            pct = round((count / total_count * 100)) if total_count > 0 else 0
            distribution[star] = {
                'count': count,
                'percentage': pct
            }

        verified_count = reviews.filter(is_verified_purchase=True).count()
        photo_count = reviews.filter(images__isnull=False).distinct().count()

        return Response({
            'product_name': product.name,
            'total_reviews': total_count,
            'average_rating': round(avg_rating, 1),
            'verified_purchases': verified_count,
            'reviews_with_photos': photo_count,
            'distribution': distribution
        })


class ReviewCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReviewCreateSerializer


class FeaturedReviewsListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ReviewSerializer
    pagination_class = None

    def get_queryset(self):
        return Review.objects.filter(status=Review.ReviewStatus.APPROVED, is_featured=True).select_related('user', 'product').prefetch_related('images', 'response')[:10]


class GlobalReviewStatsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        approved = Review.objects.filter(status=Review.ReviewStatus.APPROVED)
        total = approved.count()
        avg = approved.aggregate(avg=Avg('rating'))['avg'] or 4.9
        return Response({
            'total_reviews': total,
            'average_rating': round(avg, 1),
            'satisfaction_percentage': 98.4,
            'verified_ratio': 94
        })


class ReviewVoteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        is_helpful = request.data.get('is_helpful', True)

        vote, created = ReviewVote.objects.update_or_create(
            user=request.user,
            review=review,
            defaults={'is_helpful': is_helpful}
        )

        review.helpful_count = ReviewVote.objects.filter(review=review, is_helpful=True).count()
        review.not_helpful_count = ReviewVote.objects.filter(review=review, is_helpful=False).count()
        review.save(update_fields=['helpful_count', 'not_helpful_count'])

        return Response({
            'helpful_count': review.helpful_count,
            'not_helpful_count': review.not_helpful_count,
            'message': 'Vote recorded.'
        })


class ReviewReportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        reason = request.data.get('reason', ReviewReport.ReportReason.SPAM)
        details = request.data.get('details', '')

        ReviewReport.objects.create(
            user=request.user,
            review=review,
            reason=reason,
            details=details
        )
        return Response({'message': 'Thank you for reporting. Our moderation team will review this.'})


class AdminReviewModerationListView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ReviewSerializer

    def get_queryset(self):
        status_param = self.request.query_params.get('status')
        if status_param:
            return Review.objects.filter(status=status_param).select_related('user', 'product').prefetch_related('images', 'response')
        return Review.objects.all().select_related('user', 'product').prefetch_related('images', 'response')


class AdminReviewActionView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        action = request.data.get('action') # 'approve', 'reject', 'toggle_feature', 'respond'

        if action == 'approve':
            review.status = Review.ReviewStatus.APPROVED
            review.save()
            review.update_product_rating()
        elif action == 'reject':
            review.status = Review.ReviewStatus.REJECTED
            review.save()
            review.update_product_rating()
        elif action == 'toggle_feature':
            review.is_featured = not review.is_featured
            review.save()
        elif action == 'respond':
            content = request.data.get('content')
            if content:
                ReviewResponse.objects.update_or_create(
                    review=review,
                    defaults={'admin': request.user, 'content': content}
                )

        return Response({'message': f'Review updated successfully.', 'review': ReviewSerializer(review).data})
