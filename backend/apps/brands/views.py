from rest_framework import generics, permissions
from apps.brands.models import Brand
from apps.brands.serializers import BrandSerializer

class BrandListView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Brand.objects.all().prefetch_related('products')
    serializer_class = BrandSerializer
    pagination_class = None


class BrandDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Brand.objects.all().prefetch_related('products')
    serializer_class = BrandSerializer
    lookup_field = 'slug'


class BrandAdminDetailByIdView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
