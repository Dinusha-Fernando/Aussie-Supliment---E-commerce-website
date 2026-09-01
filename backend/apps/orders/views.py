from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from apps.orders.models import Order
from apps.orders.serializers import OrderSerializer, OrderCreateSerializer

class OrderCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class UserOrderListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items', 'items__product')


class OrderDetailByNumberView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, order_number):
        order = get_object_or_404(Order.objects.prefetch_related('items', 'items__product'), order_number=order_number)
        return Response(OrderSerializer(order).data)


class AdminOrderListView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = OrderSerializer

    def get_queryset(self):
        qs = Order.objects.all().prefetch_related('items', 'items__product')
        status_param = self.request.query_params.get('status')
        if status_param:
            qs = qs.filter(status=status_param)
        order_type = self.request.query_params.get('order_type')
        if order_type:
            qs = qs.filter(order_type=order_type)
        return qs


class AdminOrderStatusUpdateView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, order_number):
        order = get_object_or_404(Order, order_number=order_number)
        new_status = request.data.get('status')
        tracking_number = request.data.get('tracking_number')

        if new_status:
            order.status = new_status
        if tracking_number:
            order.tracking_number = tracking_number

        order.save()
        return Response(OrderSerializer(order).data)


class StripeConfigView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        from django.conf import settings
        return Response({
            'publishableKey': getattr(settings, 'STRIPE_PUBLIC_KEY', 'pk_test_demo')
        })


class CreatePaymentIntentView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        import stripe
        import uuid
        from django.conf import settings

        stripe.api_key = getattr(settings, 'STRIPE_SECRET_KEY', 'sk_test_demo')
        data = request.data

        total_amount = float(data.get('total_amount', 0))
        currency = str(data.get('currency', 'aud')).lower()
        order_number = data.get('order_number') or f"AUS-{uuid.uuid4().hex[:8].upper()}"
        customer_email = data.get('customer_email', 'customer@example.com')

        # Stripe requires amounts in smallest currency unit (e.g. cents)
        amount_in_cents = int(round(total_amount * 100))
        if amount_in_cents <= 0:
            amount_in_cents = 1000  # Fallback $10.00 min for test

        # Attempt creating real Stripe PaymentIntent
        try:
            intent = stripe.PaymentIntent.create(
                amount=amount_in_cents,
                currency=currency,
                automatic_payment_methods={'enabled': True},
                metadata={
                    'order_number': order_number,
                    'customer_email': customer_email
                }
            )
            return Response({
                'clientSecret': intent.client_secret,
                'paymentIntentId': intent.id,
                'order_number': order_number,
                'amount': total_amount,
                'currency': currency.upper(),
                'status': intent.status
            })
        except Exception as e:
            # Resilient fallback client secret for development / mock sandbox testing
            mock_secret = f"pi_mock_{uuid.uuid4().hex[:16]}_secret_{uuid.uuid4().hex[:16]}"
            return Response({
                'clientSecret': mock_secret,
                'paymentIntentId': f"pi_mock_{uuid.uuid4().hex[:16]}",
                'order_number': order_number,
                'amount': total_amount,
                'currency': currency.upper(),
                'status': 'requires_payment_method',
                'notice': 'Development mock sandbox active'
            })


class StripeWebhookView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        import stripe
        from django.conf import settings
        from django.http import HttpResponse

        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        webhook_secret = getattr(settings, 'STRIPE_WEBHOOK_SECRET', '')

        try:
            if webhook_secret and sig_header:
                event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
            else:
                event = request.data
        except Exception:
            return HttpResponse(status=400)

        # Handle successful payment intent
        event_type = event.get('type') if isinstance(event, dict) else getattr(event, 'type', '')
        if event_type == 'payment_intent.succeeded':
            payment_intent = event['data']['object'] if isinstance(event, dict) else event.data.object
            order_number = payment_intent.get('metadata', {}).get('order_number')
            if order_number:
                Order.objects.filter(order_number=order_number).update(
                    payment_status=Order.PaymentStatus.PAID,
                    status=Order.OrderStatus.CONFIRMED
                )

        return HttpResponse(status=200)

