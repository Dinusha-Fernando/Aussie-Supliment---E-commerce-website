from django.urls import path
from apps.cart.views import (
    CartView,
    CartAddItemView,
    CartUpdateItemView,
    CartRemoveItemView,
    CartClearView
)

urlpatterns = [
    path('', CartView.as_view(), name='cart_detail'),
    path('add/', CartAddItemView.as_view(), name='cart_add'),
    path('items/<int:pk>/', CartUpdateItemView.as_view(), name='cart_update'),
    path('items/<int:pk>/remove/', CartRemoveItemView.as_view(), name='cart_remove'),
    path('clear/', CartClearView.as_view(), name='cart_clear'),
]
