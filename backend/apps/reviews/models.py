from typing import ClassVar
from decimal import Decimal
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.accounts.models import User
from apps.products.models import Product

class Review(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()

    class ReviewStatus(models.TextChoices):
        PENDING = 'PENDING', 'Pending Moderation'
        APPROVED = 'APPROVED', 'Approved'
        REJECTED = 'REJECTED', 'Rejected'
        HIDDEN = 'HIDDEN', 'Hidden'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    title = models.CharField(max_length=200)
    content = models.TextField()
    
    is_verified_purchase = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=ReviewStatus.choices, default=ReviewStatus.APPROVED)
    is_featured = models.BooleanField(default=False)
    
    helpful_count = models.PositiveIntegerField(default=0)
    not_helpful_count = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.rating}★ by {self.user.first_name or self.user.username} on {self.product.name}"

    def update_product_rating(self):
        approved_reviews = Review.objects.filter(product=self.product, status=self.ReviewStatus.APPROVED)
        count = approved_reviews.count()
        if count > 0:
            total_stars = sum(r.rating for r in approved_reviews)
            self.product.rating_avg = Decimal(str(round(total_stars / count, 2)))
            self.product.review_count = count
        else:
            self.product.rating_avg = Decimal('5.00')
            self.product.review_count = 0
        self.product.save(update_fields=['rating_avg', 'review_count'])


class ReviewImage(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField(max_length=500)
    alt_text = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo for review #{self.review.id}"


class ReviewResponse(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    review = models.OneToOneField(Review, on_delete=models.CASCADE, related_name='response')
    admin = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Response to review #{self.review.id}"


class ReviewVote(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='review_votes')
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='votes')
    is_helpful = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'review')


class ReviewReport(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    class ReportReason(models.TextChoices):
        SPAM = 'SPAM', 'Spam / Advertising'
        OFFENSIVE = 'OFFENSIVE', 'Offensive Language'
        FAKE = 'FAKE', 'Suspected Fake Review'
        IRRELEVANT = 'IRRELEVANT', 'Irrelevant to Product'
        OTHER = 'OTHER', 'Other'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='review_reports')
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='reports')
    reason = models.CharField(max_length=30, choices=ReportReason.choices, default=ReportReason.SPAM)
    details = models.TextField(blank=True, null=True)
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report on Review #{self.review.id} ({self.get_reason_display()})"
