from django.urls import path
from apps.blog.views import (
    BlogCategoryListView,
    BlogCategoryDetailView,
    BlogPostListView,
    BlogPostDetailView,
    BlogPostAdminDetailByIdView,
)

urlpatterns = [
    path('categories/', BlogCategoryListView.as_view(), name='blog_category_list'),
    path('categories/<int:pk>/', BlogCategoryDetailView.as_view(), name='blog_category_detail'),
    path('posts/', BlogPostListView.as_view(), name='blog_post_list'),
    path('posts/admin/<int:pk>/', BlogPostAdminDetailByIdView.as_view(), name='blog_post_admin_detail'),
    path('posts/<slug:slug>/', BlogPostDetailView.as_view(), name='blog_post_detail'),
]
