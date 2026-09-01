from rest_framework import serializers
from apps.orders.models import Order, OrderItem
from apps.products.models import Product
from apps.coupons.models import Coupon

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'product_name', 'sku', 'quantity', 'unit_price', 'total_price')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


class OrderCreateSerializer(serializers.Serializer):
    order_number = serializers.CharField(max_length=50, required=False, allow_blank=True)
    order_type = serializers.ChoiceField(choices=Order.OrderType.choices, default=Order.OrderType.RETAIL)
    customer_email = serializers.EmailField()
    customer_phone = serializers.CharField(max_length=30)
    shipping_first_name = serializers.CharField(max_length=100)
    shipping_last_name = serializers.CharField(max_length=100)
    company_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    street_address = serializers.CharField(max_length=255)
    apartment = serializers.CharField(max_length=100, required=False, allow_blank=True)
    city = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=50)
    postcode = serializers.CharField(max_length=20)
    shipping_method = serializers.ChoiceField(choices=Order.ShippingMethod.choices, default=Order.ShippingMethod.STANDARD)
    payment_method = serializers.CharField(default='Credit Card (Stripe)')
    coupon_code = serializers.CharField(max_length=50, required=False, allow_blank=True)
    customer_notes = serializers.CharField(required=False, allow_blank=True)
    
    items = serializers.ListField(
        child=serializers.DictField(),
        min_length=1
    )

    def create(self, validated_data):
        import uuid
        items_data = validated_data.pop('items')
        coupon_code = validated_data.get('coupon_code', '').strip().upper()
        shipping_method = validated_data.get('shipping_method', Order.ShippingMethod.STANDARD)
        user = self.context['request'].user if self.context['request'].user.is_authenticated else None
        order_number = validated_data.pop('order_number', None) or f"AUS-{uuid.uuid4().hex[:8].upper()}"

        # Calculate subtotal
        subtotal = 0
        order_items_to_create = []

        for item_data in items_data:
            product_id = item_data.get('product_id')
            qty = int(item_data.get('quantity', 1))
            is_wholesale = item_data.get('is_wholesale', False)
            
            try:
                product = Product.objects.get(id=product_id)
                unit_price = product.wholesale_price if is_wholesale else product.retail_price
                sku = product.sku
                product_name = product.name
            except Product.DoesNotExist:
                product = None
                unit_price = float(item_data.get('unit_price', 0))
                sku = item_data.get('sku', 'APN-PROD')
                product_name = item_data.get('product_name', 'Australian Supplement')

            line_total = float(unit_price) * qty
            subtotal += line_total

            order_items_to_create.append({
                'product': product,
                'product_name': product_name,
                'sku': sku,
                'quantity': qty,
                'unit_price': unit_price,
                'total_price': line_total
            })

        # Calculate discount
        discount_amount = 0.0
        if coupon_code:
            try:
                coupon = Coupon.objects.get(code__iexact=coupon_code)
                is_valid, msg = coupon.is_valid_for_amount(subtotal)
                if is_valid:
                    discount_amount = float(coupon.calculate_discount(subtotal))
                    coupon.times_used += 1
                    coupon.save(update_fields=['times_used'])
            except Coupon.DoesNotExist:
                pass

        # Calculate shipping fee
        if shipping_method == Order.ShippingMethod.EXPRESS:
            shipping_fee = 14.95
        elif shipping_method == Order.ShippingMethod.PALLET_FREIGHT:
            shipping_fee = 45.00
        else: # Standard
            shipping_fee = 0.00 if (subtotal - discount_amount) >= 100.00 else 9.95

        total_amount = round(subtotal - discount_amount + shipping_fee, 2)
        tax_gst = round(total_amount / 11, 2) # Australian 10% GST included
        first_sku = order_items_to_create[0]['sku'] if order_items_to_create else 'AUS'

        order = Order.objects.create(
            order_number=order_number,
            user=user,
            subtotal=subtotal,
            discount_amount=discount_amount,
            shipping_fee=shipping_fee,
            tax_gst=tax_gst,
            total_amount=total_amount,
            tracking_number=f"AUSPOST-{first_sku[:3]}-98234",
            **validated_data
        )

        for oi in order_items_to_create:
            OrderItem.objects.create(order=order, **oi)

        return order

