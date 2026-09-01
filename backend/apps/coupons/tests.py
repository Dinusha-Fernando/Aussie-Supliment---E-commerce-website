from rest_framework.test import APITestCase
from rest_framework import status
from apps.coupons.models import Coupon

class CouponsAPITests(APITestCase):
    def setUp(self):
        self.coupon = Coupon.objects.create(
            code='WELCOME10',
            discount_type=Coupon.DiscountType.PERCENTAGE,
            discount_value=10.00,
            min_spend=50.00,
            is_active=True
        )

    def test_valid_coupon(self):
        url = '/api/coupons/validate/'
        res = self.client.post(url, {'code': 'WELCOME10', 'subtotal': 100.00}, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(res.data['valid'])
        self.assertEqual(res.data['discount_amount'], 10.00)

    def test_invalid_coupon(self):
        url = '/api/coupons/validate/'
        res = self.client.post(url, {'code': 'NONEXISTENT', 'subtotal': 100.00}, format='json')
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.assertFalse(res.data['valid'])
