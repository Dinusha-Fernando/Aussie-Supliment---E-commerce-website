from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Sum, Count, Avg
from django.utils import timezone
from apps.orders.models import Order
from apps.products.models import Product
from apps.reviews.models import Review
from apps.wholesale.models import WholesaleApplication
from apps.accounts.models import User

class AdminDashboardKPIsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        now = timezone.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

        # Revenue
        all_orders = Order.objects.filter(payment_status=Order.PaymentStatus.PAID)
        total_revenue = all_orders.aggregate(s=Sum('total_amount'))['s'] or 0
        today_orders = all_orders.filter(created_at__gte=today_start)
        today_revenue = today_orders.aggregate(s=Sum('total_amount'))['s'] or 0

        # Retail vs Wholesale
        retail_rev = all_orders.filter(order_type=Order.OrderType.RETAIL).aggregate(s=Sum('total_amount'))['s'] or 0
        wholesale_rev = all_orders.filter(order_type=Order.OrderType.WHOLESALE).aggregate(s=Sum('total_amount'))['s'] or 0

        total_orders_count = Order.objects.count()
        today_orders_count = today_orders.count()
        total_customers = User.objects.filter(role=User.Role.RETAIL).count()
        total_wholesale_accounts = User.objects.filter(role=User.Role.WHOLESALE).count()

        pending_reviews = Review.objects.filter(status=Review.ReviewStatus.PENDING).count()
        pending_wholesale_apps = WholesaleApplication.objects.filter(status=WholesaleApplication.Status.PENDING).count()
        low_stock_products = Product.objects.filter(is_active=True, stock_quantity__lte=20).count()

        avg_rating = Review.objects.filter(status=Review.ReviewStatus.APPROVED).aggregate(a=Avg('rating'))['a'] or 4.9

        # Recent 5 orders
        recent_orders = []
        for o in Order.objects.all().order_by('-created_at')[:5]:
            recent_orders.append({
                'order_number': o.order_number,
                'customer_email': o.customer_email,
                'order_type': o.order_type,
                'total_amount': float(o.total_amount),
                'status': o.status,
                'created_at': o.created_at
            })

        return Response({
            'kpis': {
                'today_revenue': float(today_revenue),
                'total_revenue': float(total_revenue),
                'retail_revenue': float(retail_rev),
                'wholesale_revenue': float(wholesale_rev),
                'today_orders_count': today_orders_count,
                'total_orders_count': total_orders_count,
                'total_customers': total_customers,
                'total_wholesale_accounts': total_wholesale_accounts,
                'pending_reviews': pending_reviews,
                'pending_wholesale_apps': pending_wholesale_apps,
                'low_stock_count': low_stock_products,
                'average_rating': round(avg_rating, 2)
            },
            'recent_orders': recent_orders
        })
