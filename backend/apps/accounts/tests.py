from rest_framework.test import APITestCase
from rest_framework import status
from apps.accounts.models import User, Address

class AccountsAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@aussiesupplements.com.au',
            username='test@aussiesupplements.com.au',
            password='SecurePassword123!',
            first_name='Test',
            last_name='User',
            role=User.Role.RETAIL
        )

    def test_register(self):
        url = '/api/auth/register/'
        data = {
            'email': 'newuser@example.com',
            'password': 'NewPassword123!',
            'first_name': 'New',
            'last_name': 'Customer',
            'phone': '0400111222'
        }
        res = self.client.post(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIn('access', res.data)
        self.assertTrue(User.objects.filter(email='newuser@example.com').exists())

    def test_login(self):
        url = '/api/auth/login/'
        data = {
            'email': 'test@aussiesupplements.com.au',
            'password': 'SecurePassword123!'
        }
        res = self.client.post(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('access', res.data)

    def test_me_authenticated(self):
        self.client.force_authenticate(user=self.user)
        url = '/api/auth/me/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['email'], self.user.email)

    def test_address_management(self):
        self.client.force_authenticate(user=self.user)
        url = '/api/auth/addresses/'
        data = {
            'first_name': 'Test',
            'last_name': 'User',
            'street_address': '123 Melbourne St',
            'city': 'Melbourne',
            'state': 'VIC',
            'postcode': '3000',
            'country': 'Australia',
            'phone': '0412345678',
            'is_default': True
        }
        res = self.client.post(url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Address.objects.filter(user=self.user).count(), 1)
