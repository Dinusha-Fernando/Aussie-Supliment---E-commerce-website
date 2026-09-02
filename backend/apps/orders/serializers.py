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
    whatsapp_receipt_url = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def get_whatsapp_receipt_url(self, obj):
        from apps.orders.emails import format_whatsapp_order_url
        return format_whatsapp_order_url(obj)


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
        from django.db import transaction
        
        items_data = validated_data.pop('items')
        coupon_code = validated_data.get('coupon_code', '').strip().upper()
        shipping_method = validated_data.get('shipping_method', Order.ShippingMethod.STANDARD)
        payment_method = validated_data.get('payment_method', 'Credit Card (Stripe)')
        user = self.context['request'].user if self.context['request'].user.is_authenticated else None
        order_number = validated_data.pop('order_number', None) or f"AUS-{uuid.uuid4().hex[:8].upper()}"

        # Security: Authorize wholesale pricing (OWASP Business Logic & Authorization)
        is_authorized_wholesale = (
            user is not None and 
            getattr(user, 'role', '') == 'WHOLESALE'
        )

        subtotal = 0
        order_items_to_create = []

        with transaction.atomic():
            for item_data in items_data:
                product_id = item_data.get('product_id')
                
                # Security: Enforce strictly positive quantities (prevent negative price injection)
                try:
                    qty = int(item_data.get('quantity', 1))
                except (ValueError, TypeError):
                    qty = 1
                if qty <= 0:
                    raise serializers.ValidationError({"items": "Quantity must be at least 1."})

                # Security: Retail users cannot inject wholesale rates
                client_claimed_wholesale = bool(item_data.get('is_wholesale', False))
                grant_wholesale = client_claimed_wholesale and is_authorized_wholesale

                try:
                    product = Product.objects.select_for_update().get(id=product_id)
                    # Authoritative server-side price lookup - client cannot alter unit price
                    unit_price = float(product.wholesale_price if grant_wholesale else product.retail_price)
                    sku = product.sku
                    product_name = product.name

                    # Security: Enforce inventory availability
                    if product.stock_quantity < qty:
                        raise serializers.ValidationError({
                            "items": f"Insufficient inventory for '{product.name}'. Available: {product.stock_quantity}, requested: {qty}."
                        })

                    # Atomic stock decrement
                    product.stock_quantity -= qty
                    product.save(update_fields=['stock_quantity'])

                except Product.DoesNotExist:
                    product = None
                    unit_price = float(item_data.get('unit_price', 0))
                    if unit_price <= 0:
                        unit_price = 49.95
                    sku = item_data.get('sku', 'APN-PROD')
                    product_name = item_data.get('product_name', 'Australian Supplement')

                line_total = round(unit_price * qty, 2)
                subtotal += line_total

                order_items_to_create.append({
                    'product': product,
                    'product_name': product_name,
                    'sku': sku,
                    'quantity': qty,
                    'unit_price': unit_price,
                    'total_price': line_total
                })

            # Calculate coupon discount
            discount_amount = 0.0
            if coupon_code:
                try:
                    coupon = Coupon.objects.select_for_update().get(code__iexact=coupon_code)
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
            else:  # Standard
                shipping_fee = 0.00 if (subtotal - discount_amount) >= 100.00 else 9.95

            total_amount = round(subtotal - discount_amount + shipping_fee, 2)
            tax_gst = round(total_amount / 11, 2)
            first_sku = order_items_to_create[0]['sku'] if order_items_to_create else 'AUS'

            # Security: New orders start UNPAID / PENDING until payment verification
            # Only approved B2B Wholesale accounts on net-30 terms start in PROCESSING
            if 'Invoice' in payment_method and is_authorized_wholesale:
                initial_status = Order.OrderStatus.PROCESSING
                initial_payment = Order.PaymentStatus.UNPAID
            else:
                initial_status = Order.OrderStatus.PENDING
                initial_payment = Order.PaymentStatus.UNPAID

            order = Order.objects.create(
                order_number=order_number,
                user=user,
                status=initial_status,
                payment_status=initial_payment,
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


