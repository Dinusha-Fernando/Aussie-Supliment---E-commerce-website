from rest_framework.test import APITestCase
from rest_framework import status
from apps.brands.models import Brand
from apps.categories.models import Category
from apps.products.models import Product

class ProductsAPITests(APITestCase):
    def setUp(self):
        self.brand = Brand.objects.create(
            name='Aussie Pure Nutrition',
            slug='aussie-pure-nutrition',
            origin_country='Australia'
        )
        self.category = Category.objects.create(
            name='Protein',
            slug='protein'
        )
        self.product = Product.objects.create(
            name='Grass-Fed WPI 2kg',
            slug='grass-fed-wpi-2kg',
            sku='APN-WPI-2KG',
            brand=self.brand,
            category=self.category,
            retail_price=89.95,
            wholesale_price=58.50,
            stock_quantity=100,
            is_active=True,
            is_featured=True,
            is_best_seller=True
        )

    def test_list_products(self):
        url = '/api/products/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(res.data['results']), 1)

    def test_product_detail(self):
        url = f'/api/products/{self.product.slug}/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['sku'], self.product.sku)

    def test_bestsellers_and_featured(self):
        url_bs = '/api/products/best-sellers/'
        res_bs = self.client.get(url_bs)
        self.assertEqual(res_bs.status_code, status.HTTP_200_OK)

        url_ft = '/api/products/featured/'
        res_ft = self.client.get(url_ft)
        self.assertEqual(res_ft.status_code, status.HTTP_200_OK)
