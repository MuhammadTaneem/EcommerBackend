from django.urls import include, path
from rest_framework import routers
from .views import OrderViewSet, SingleOrderViewSet

router = routers.DefaultRouter()
router.register('cart', OrderViewSet)
router.register('single', SingleOrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
