from rest_framework.test import APITestCase
from rest_framework import status
from apps.wholesale.models import WholesaleApplication, WholesaleTier

class WholesaleAPITests(APITestCase):
    def setUp(self):
        self.tier = WholesaleTier.objects.create(
            name='Tier 1',
            discount_percentage=25.00,
            min_order_value=300.00
        )

    def test_submit_wholesale_application(self):
        url = '/api/wholesale/apply/'
        data = {
            'business_name': 'FitZone Melbourne',
            'abn': '12345678901',
            'contact_name': 'John Doe',
            'email': 'john@fitzone.com.au',
            'phone': '0411222333',
            'business_type': WholesaleApplication.BusinessType.GYM,
            'website': 'https://fitzone.com.au',
            'estimated_monthly_spend': '$2,000 - $5,000',
            'interested_categories': 'Protein, Creatine',
            'message': 'Looking forward to stocking Aussie Supplements.'
        }
        res = self.client.post(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(WholesaleApplication.objects.filter(abn='12345678901').exists())

    def test_wholesale_catalog(self):
        url = '/api/wholesale/products/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
