from django.contrib import admin
from apps.reviews.models import Review, ReviewImage, ReviewResponse, ReviewVote, ReviewReport

class ReviewImageInline(admin.TabularInline):
    model = ReviewImage
    extra = 1

class ReviewResponseInline(admin.StackedInline):
    model = ReviewResponse
    extra = 0

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'rating', 'title', 'is_verified_purchase', 'is_featured', 'status', 'helpful_count', 'created_at')
    list_filter = ('status', 'rating', 'is_verified_purchase', 'is_featured')
    search_fields = ('title', 'content', 'user__email', 'product__name')
    inlines = [ReviewImageInline, ReviewResponseInline]
    actions = ['approve_reviews', 'reject_reviews', 'mark_as_featured']

    def approve_reviews(self, request, queryset):
        for r in queryset:
            r.status = Review.ReviewStatus.APPROVED
            r.save()
            r.update_product_rating()
    approve_reviews.short_description = "Approve selected reviews"

    def reject_reviews(self, request, queryset):
        for r in queryset:
            r.status = Review.ReviewStatus.REJECTED
            r.save()
            r.update_product_rating()
    reject_reviews.short_description = "Reject selected reviews"

    def mark_as_featured(self, request, queryset):
        queryset.update(is_featured=True)
    mark_as_featured.short_description = "Mark selected reviews as Featured"

@admin.register(ReviewReport)
class ReviewReportAdmin(admin.ModelAdmin):
    list_display = ('review', 'user', 'reason', 'is_resolved', 'created_at')
    list_filter = ('reason', 'is_resolved')
