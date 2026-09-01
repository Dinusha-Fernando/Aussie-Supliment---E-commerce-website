from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from apps.cart.models import Cart, CartItem
from apps.cart.serializers import CartSerializer
from apps.products.models import Product

def get_or_create_cart(request):
    session_id = request.headers.get('X-Session-ID') or request.query_params.get('session_id')
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    elif session_id:
        cart, _ = Cart.objects.get_or_create(session_id=session_id)
    else:
        import uuid
        session_id = str(uuid.uuid4())
        cart = Cart.objects.create(session_id=session_id)
    return cart

class CartView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        cart = get_or_create_cart(request)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class CartAddItemView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        cart = get_or_create_cart(request)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        is_wholesale = request.data.get('is_wholesale', False)

        product = get_object_or_404(Product, id=product_id)

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            is_wholesale=is_wholesale,
            defaults={'quantity': quantity}
        )

        if not created:
            item.quantity += quantity
            item.save()

        return Response(CartSerializer(cart).data)


class CartUpdateItemView(APIView):
    permission_classes = [permissions.AllowAny]

    def patch(self, request, pk):
        item = get_object_or_404(CartItem, pk=pk)
        quantity = int(request.data.get('quantity', 1))

        if quantity <= 0:
            cart = item.cart
            item.delete()
            return Response(CartSerializer(cart).data)

        item.quantity = quantity
        item.save()
        return Response(CartSerializer(item.cart).data)


class CartRemoveItemView(APIView):
    permission_classes = [permissions.AllowAny]

    def delete(self, request, pk):
        item = get_object_or_404(CartItem, pk=pk)
        cart = item.cart
        item.delete()
        return Response(CartSerializer(cart).data)


class CartClearView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        cart = get_or_create_cart(request)
        cart.items.all().delete()
        return Response(CartSerializer(cart).data)
