from rest_framework.test import APITestCase
from rest_framework import status
from apps.cms.models import SiteConfig, HeroSlide, DiagnosticQuizQuestion, TrustPillar

class CMSAPITests(APITestCase):
    def setUp(self):
        SiteConfig.get_solo()
        self.slide = HeroSlide.objects.create(title='Hero 1', order=1, is_active=True)
        self.pillar = TrustPillar.objects.create(title='Pillar 1', subtitle='Sub', order=1, is_active=True)
        self.quiz = DiagnosticQuizQuestion.objects.create(
            step_number=1,
            question_text='Objective?',
            options=[{'id': 'muscle', 'title': 'Muscle'}],
            order=1,
            is_active=True
        )

    def test_get_site_config(self):
        url = '/api/cms/config/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('site_name', res.data)

    def test_update_site_config(self):
        url = '/api/cms/config/'
        res = self.client.put(url, {'announcement_text': 'Updated Banner', 'lkr_multiplier': 250}, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['announcement_text'], 'Updated Banner')

    def test_hero_slides_crud(self):
        # Create
        create_res = self.client.post('/api/cms/hero-slides/', {
            'title': 'New Slide 2',
            'tagline': 'New Tagline',
            'retail_price': 99.95,
            'wholesale_price': 60.00,
            'order': 2,
            'is_active': True
        }, format='json')
        self.assertEqual(create_res.status_code, status.HTTP_201_CREATED)
        new_id = create_res.data['id']

        # Update
        patch_res = self.client.patch(f'/api/cms/hero-slides/{new_id}/', {'title': 'Updated Slide 2'}, format='json')
        self.assertEqual(patch_res.status_code, status.HTTP_200_OK)
        self.assertEqual(patch_res.data['title'], 'Updated Slide 2')

        # Delete
        del_res = self.client.delete(f'/api/cms/hero-slides/{new_id}/')
        self.assertEqual(del_res.status_code, status.HTTP_204_NO_CONTENT)

    def test_diagnostic_quiz(self):
        url = '/api/cms/quiz/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(res.data), 1)

    def test_trust_pillars(self):
        url = '/api/cms/trust-pillars/'
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(res.data), 1)
