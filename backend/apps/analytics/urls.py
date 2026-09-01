from django.urls import path
from apps.analytics.views import AdminDashboardKPIsView

urlpatterns = [
    path('dashboard/', AdminDashboardKPIsView.as_view(), name='admin_dashboard_kpis'),
]
