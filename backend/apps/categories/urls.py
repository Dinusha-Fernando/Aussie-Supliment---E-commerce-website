from django.urls import path
from apps.categories.views import (
    CategoryListView,
    CategoryDetailView,
    CategoryAdminDetailByIdView,
    SubcategoryListCreateView,
    SubcategoryDetailView
)

urlpatterns = [
    path('', CategoryListView.as_view(), name='category_list'),
    path('admin/<int:pk>/', CategoryAdminDetailByIdView.as_view(), name='category_admin_detail'),
    path('subcategories/', SubcategoryListCreateView.as_view(), name='subcategory_list_create'),
    path('subcategories/<int:pk>/', SubcategoryDetailView.as_view(), name='subcategory_detail'),
    path('<slug:slug>/', CategoryDetailView.as_view(), name='category_detail'),
]
