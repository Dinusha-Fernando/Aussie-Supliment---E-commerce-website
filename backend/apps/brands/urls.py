from django.urls import path
from apps.brands.views import BrandListView, BrandDetailView, BrandAdminDetailByIdView

urlpatterns = [
    path('', BrandListView.as_view(), name='brand_list'),
    path('admin/<int:pk>/', BrandAdminDetailByIdView.as_view(), name='brand_admin_detail'),
    path('<slug:slug>/', BrandDetailView.as_view(), name='brand_detail'),
]
