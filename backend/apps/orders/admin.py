from django.contrib import admin
from apps.orders.models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'order_type', 'customer_email', 'total_amount', 'status', 'payment_status', 'shipping_method', 'created_at')
    list_filter = ('order_type', 'status', 'payment_status', 'shipping_method')
    search_fields = ('order_number', 'customer_email', 'shipping_first_name', 'shipping_last_name', 'tracking_number')
    inlines = [OrderItemInline]
