from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.coupons.models import Coupon
from apps.coupons.serializers import CouponSerializer

class CouponValidateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        code = request.data.get('code', '').strip().upper()
        subtotal = float(request.data.get('subtotal', 0))

        if not code:
            return Response({'valid': False, 'message': 'Please provide a coupon code.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            coupon = Coupon.objects.get(code__iexact=code)
            is_valid, msg = coupon.is_valid_for_amount(subtotal)
            if not is_valid:
                return Response({'valid': False, 'message': msg}, status=status.HTTP_400_BAD_REQUEST)

            discount = coupon.calculate_discount(subtotal)
            return Response({
                'valid': True,
                'code': coupon.code,
                'discount_type': coupon.discount_type,
                'discount_value': float(coupon.discount_value),
                'discount_amount': float(discount),
                'message': f"Coupon applied: Saved ${discount:.2f} AUD"
            })
        except Coupon.DoesNotExist:
            return Response({'valid': False, 'message': 'Invalid coupon code.'}, status=status.HTTP_404_NOT_FOUND)


class CouponListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Coupon.objects.all().order_by('-id')
    serializer_class = CouponSerializer
    pagination_class = None


class CouponDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
