from django.urls import path
from apps.products.views import (
    ProductListView,
    ProductDetailView,
    ProductAdminDetailView,
    BestSellersView,
    FeaturedProductsView,
    CompareProductsView,
    SupplementFinderView
)

urlpatterns = [
    path('', ProductListView.as_view(), name='product_list'),
    path('admin/<int:pk>/', ProductAdminDetailView.as_view(), name='product_admin_detail'),
    path('best-sellers/', BestSellersView.as_view(), name='product_best_sellers'),
    path('featured/', FeaturedProductsView.as_view(), name='product_featured'),
    path('compare/', CompareProductsView.as_view(), name='product_compare'),
    path('finder/', SupplementFinderView.as_view(), name='supplement_finder'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='product_detail'),
]
