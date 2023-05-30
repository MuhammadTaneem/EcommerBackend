from django.urls import include, path
from rest_framework import routers
from .views import ProductViewSet, CategoryViewSet, get_category_product
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register('list', ProductViewSet)
router.register('category', CategoryViewSet)
# router.register('fcat', get_category_product)

urlpatterns = [
    path('', include(router.urls)),
    path('fcat', get_category_product),
]
