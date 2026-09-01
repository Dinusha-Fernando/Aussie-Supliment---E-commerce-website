from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from apps.wholesale.models import WholesaleApplication, WholesaleTier
from apps.wholesale.serializers import WholesaleApplicationSerializer, WholesaleProductCatalogSerializer
from apps.products.models import Product
from apps.accounts.models import User

class WholesaleApplicationSubmitView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = WholesaleApplicationSerializer

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)


class WholesaleProductCatalogView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = WholesaleProductCatalogSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True).select_related('brand', 'category').prefetch_related('images', 'wholesale_prices')
        q = self.request.query_params.get('q')
        if q:
            qs = qs.filter(name__icontains=q) | qs.filter(sku__icontains=q)
        return qs


class WholesaleApplicationAdminListView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = WholesaleApplicationSerializer
    queryset = WholesaleApplication.objects.all().select_related('user', 'assigned_tier')


class WholesaleApplicationAdminStatusView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):
        app = get_object_or_404(WholesaleApplication, pk=pk)
        new_status = request.data.get('status')
        admin_notes = request.data.get('admin_notes', '')

        if new_status:
            app.status = new_status
            if admin_notes:
                app.admin_notes = admin_notes
            app.save()

            if new_status == WholesaleApplication.Status.APPROVED and app.user:
                app.user.role = User.Role.WHOLESALE
                app.user.save(update_fields=['role'])

        return Response({'message': 'Application status updated.', 'application': WholesaleApplicationSerializer(app).data})
