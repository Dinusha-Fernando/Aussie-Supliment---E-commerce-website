from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.urls')),
    path('api/categories/', include('apps.categories.urls')),
    path('api/brands/', include('apps.brands.urls')),
    path('api/products/', include('apps.products.urls')),
    path('api/reviews/', include('apps.reviews.urls')),
    path('api/wholesale/', include('apps.wholesale.urls')),
    path('api/cart/', include('apps.cart.urls')),
    path('api/orders/', include('apps.orders.urls')),
    path('api/coupons/', include('apps.coupons.urls')),
    path('api/blog/', include('apps.blog.urls')),
    path('api/analytics/', include('apps.analytics.urls')),
    path('api/cms/', include('apps.cms.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
