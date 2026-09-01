from rest_framework.test import APITestCase
from rest_framework import status
from apps.accounts.models import User
from apps.brands.models import Brand
from apps.categories.models import Category
from apps.products.models import Product
from apps.reviews.models import Review

class ReviewsAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='reviewer@example.com',
            username='reviewer@example.com',
            password='Password123!'
        )
        self.brand = Brand.objects.create(name='Brand', slug='brand')
        self.category = Category.objects.create(name='Cat', slug='cat')
        self.product = Product.objects.create(
            name='Sample Product',
            slug='sample-product',
            sku='SMP-001',
            brand=self.brand,
            category=self.category,
            retail_price=50.00,
            wholesale_price=30.00,
            stock_quantity=50
        )
        self.review = Review.objects.create(
            user=self.user,
            product=self.product,
            rating=5,
            title='Great Quality!',
            content='Really loved this product.',
            status=Review.ReviewStatus.APPROVED,
            is_featured=True
        )

    def test_product_reviews_list(self):
        url = f'/api/reviews/product/{self.product.slug}/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(res.data['results']), 1)

    def test_featured_reviews_list(self):
        url = '/api/reviews/featured/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(res.data), 1)

    def test_review_vote(self):
        self.client.force_authenticate(user=self.user)
        url = f'/api/reviews/{self.review.id}/vote/'
        res = self.client.post(url, {'is_helpful': True}, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.review.refresh_from_db()
        self.assertEqual(self.review.helpful_count, 1)
