from django.urls import path
from apps.orders.views import (
    OrderCreateView,
    UserOrderListView,
    OrderDetailByNumberView,
    AdminOrderListView,
    AdminOrderStatusUpdateView,
    CreatePaymentIntentView,
    StripeWebhookView,
    StripeConfigView,
)

urlpatterns = [
    path('create/', OrderCreateView.as_view(), name='order_create'),
    path('create-payment-intent/', CreatePaymentIntentView.as_view(), name='create_payment_intent'),
    path('stripe-webhook/', StripeWebhookView.as_view(), name='stripe_webhook'),
    path('stripe-config/', StripeConfigView.as_view(), name='stripe_config'),
    path('my-orders/', UserOrderListView.as_view(), name='user_orders'),
    path('lookup/<str:order_number>/', OrderDetailByNumberView.as_view(), name='order_detail_by_number'),
    path('admin/all/', AdminOrderListView.as_view(), name='admin_orders_list'),
    path('admin/<str:order_number>/status/', AdminOrderStatusUpdateView.as_view(), name='admin_order_status_update'),
]

