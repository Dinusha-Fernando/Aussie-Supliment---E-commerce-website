from django.urls import path
from apps.coupons.views import (
    CouponValidateView,
    CouponListCreateView,
    CouponDetailView
)

urlpatterns = [
    path('validate/', CouponValidateView.as_view(), name='coupon_validate'),
    path('', CouponListCreateView.as_view(), name='coupon_list_create'),
    path('<int:pk>/', CouponDetailView.as_view(), name='coupon_detail'),
]
