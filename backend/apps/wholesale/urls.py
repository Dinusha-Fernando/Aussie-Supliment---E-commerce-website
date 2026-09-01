from django.urls import path
from apps.wholesale.views import (
    WholesaleApplicationSubmitView,
    WholesaleProductCatalogView,
    WholesaleApplicationAdminListView,
    WholesaleApplicationAdminStatusView
)

urlpatterns = [
    path('apply/', WholesaleApplicationSubmitView.as_view(), name='wholesale_apply'),
    path('products/', WholesaleProductCatalogView.as_view(), name='wholesale_products'),
    path('admin/applications/', WholesaleApplicationAdminListView.as_view(), name='admin_wholesale_applications'),
    path('admin/applications/<int:pk>/status/', WholesaleApplicationAdminStatusView.as_view(), name='admin_wholesale_status'),
]
