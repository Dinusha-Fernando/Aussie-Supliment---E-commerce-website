from rest_framework import generics, permissions
from apps.categories.models import Category, Subcategory
from apps.categories.serializers import CategorySerializer, SubcategorySerializer

class CategoryListView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all().prefetch_related('subcategories', 'products')
    serializer_class = CategorySerializer
    pagination_class = None


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all().prefetch_related('subcategories', 'products')
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class CategoryAdminDetailByIdView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SubcategoryListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer
    pagination_class = None


class SubcategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer
