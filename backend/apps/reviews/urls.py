from django.urls import path
from apps.reviews.views import (
    ProductReviewListView,
    ProductReviewStatsView,
    ReviewCreateView,
    FeaturedReviewsListView,
    GlobalReviewStatsView,
    ReviewVoteView,
    ReviewReportView,
    AdminReviewModerationListView,
    AdminReviewActionView
)

urlpatterns = [
    path('featured/', FeaturedReviewsListView.as_view(), name='featured_reviews'),
    path('global-stats/', GlobalReviewStatsView.as_view(), name='global_review_stats'),
    path('create/', ReviewCreateView.as_view(), name='review_create'),
    path('product/<slug:slug>/', ProductReviewListView.as_view(), name='product_reviews'),
    path('product/<slug:slug>/stats/', ProductReviewStatsView.as_view(), name='product_review_stats'),
    path('<int:pk>/vote/', ReviewVoteView.as_view(), name='review_vote'),
    path('<int:pk>/report/', ReviewReportView.as_view(), name='review_report'),
    path('admin/moderation/', AdminReviewModerationListView.as_view(), name='admin_review_moderation'),
    path('admin/<int:pk>/action/', AdminReviewActionView.as_view(), name='admin_review_action'),
]
