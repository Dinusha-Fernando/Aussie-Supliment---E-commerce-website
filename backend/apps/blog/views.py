from rest_framework import generics, permissions
from apps.blog.models import BlogCategory, BlogPost
from apps.blog.serializers import (
    BlogCategorySerializer,
    BlogPostListSerializer,
    BlogPostDetailSerializer,
    BlogPostAdminWriteSerializer
)

class BlogCategoryListView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer
    pagination_class = None


class BlogCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer


class BlogPostListView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BlogPostAdminWriteSerializer
        return BlogPostListSerializer

    def get_queryset(self):
        all_param = self.request.query_params.get('all')
        if all_param == 'true':
            qs = BlogPost.objects.all().select_related('category')
        else:
            qs = BlogPost.objects.filter(is_published=True).select_related('category')

        category_slug = self.request.query_params.get('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)
        q = self.request.query_params.get('q')
        if q:
            qs = qs.filter(title__icontains=q) | qs.filter(content__icontains=q)
        return qs


class BlogPostDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = BlogPost.objects.filter(is_published=True).select_related('category')
    serializer_class = BlogPostDetailSerializer
    lookup_field = 'slug'


class BlogPostAdminDetailByIdView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostAdminWriteSerializer
