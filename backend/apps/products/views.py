from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from django.db.models.query import QuerySet
from apps.products.models import Product
from apps.products.serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    ProductAdminWriteSerializer
)

class ProductListView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductAdminWriteSerializer
        return ProductListSerializer

    def get_queryset(self) -> QuerySet:
        qs = Product.objects.filter(is_active=True).select_related('brand', 'category').prefetch_related('images')
        
        # Search query
        q = self.request.query_params.get('q')
        if q:
            qs = qs.filter(
                Q(name__icontains=q) |
                Q(short_description__icontains=q) |
                Q(description__icontains=q) |
                Q(brand__name__icontains=q) |
                Q(category__name__icontains=q) |
                Q(sku__icontains=q) |
                Q(artg_number__icontains=q)
            )

        # Filters
        category_slug = self.request.query_params.get('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)

        brand_slug = self.request.query_params.get('brand')
        if brand_slug:
            qs = qs.filter(brand__slug=brand_slug)

        form = self.request.query_params.get('form')
        if form:
            qs = qs.filter(form__iexact=form)

        goal = self.request.query_params.get('goal')
        if goal:
            qs = qs.filter(goal__icontains=goal)

        dietary = self.request.query_params.get('dietary')
        if dietary:
            qs = qs.filter(dietary_tags__icontains=dietary)

        min_price = self.request.query_params.get('min_price')
        if min_price:
            qs = qs.filter(retail_price__gte=min_price)

        max_price = self.request.query_params.get('max_price')
        if max_price:
            qs = qs.filter(retail_price__lte=max_price)

        in_stock = self.request.query_params.get('in_stock')
        if in_stock == 'true':
            qs = qs.filter(stock_quantity__gt=0)

        # Sorting
        sort = self.request.query_params.get('sort', 'featured')
        if sort == 'price_low':
            qs = qs.order_by('retail_price')
        elif sort == 'price_high':
            qs = qs.order_by('-retail_price')
        elif sort == 'rating':
            qs = qs.order_by('-rating_avg', '-review_count')
        elif sort == 'newest':
            qs = qs.order_by('-created_at')
        elif sort == 'best_seller':
            qs = qs.order_by('-is_best_seller', '-rating_avg')
        else:
            qs = qs.order_by('-is_featured', '-is_best_seller', '-created_at')

        return qs


class ProductDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.filter(is_active=True).select_related('brand', 'category', 'subcategory').prefetch_related('images', 'nutrition', 'wholesale_prices')
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'


class ProductAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductAdminWriteSerializer


class BestSellersView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductListSerializer
    pagination_class = None

    def get_queryset(self) -> QuerySet:
        return Product.objects.filter(is_active=True, is_best_seller=True).select_related('brand', 'category').prefetch_related('images')[:8]


class FeaturedProductsView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductListSerializer
    pagination_class = None

    def get_queryset(self) -> QuerySet:
        return Product.objects.filter(is_active=True, is_featured=True).select_related('brand', 'category').prefetch_related('images')[:8]


class CompareProductsView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        ids = request.data.get('product_ids', [])
        if not ids:
            return Response({'error': 'No product IDs provided.'}, status=status.HTTP_400_BAD_REQUEST)
        
        products = Product.objects.filter(id__in=ids, is_active=True).select_related('brand', 'category').prefetch_related('images', 'nutrition')
        serializer = ProductDetailSerializer(products, many=True)
        return Response(serializer.data)


class SupplementFinderView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        goal = request.data.get('goal', '')
        form = request.data.get('form', '')
        dietary = request.data.get('dietary', '')

        qs = Product.objects.filter(is_active=True).select_related('brand', 'category').prefetch_related('images')
        
        if goal:
            qs = qs.filter(Q(goal__icontains=goal) | Q(category__name__icontains=goal))
        if form:
            qs = qs.filter(form__iexact=form)
        if dietary:
            qs = qs.filter(dietary_tags__icontains=dietary)

        serializer = ProductListSerializer(qs[:6], many=True)
        return Response({
            'count': qs.count(),
            'recommendations': serializer.data
        })
