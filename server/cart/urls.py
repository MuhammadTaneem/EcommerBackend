from django.urls import include, path
from rest_framework import routers
from .views import CartViewSet

router = routers.DefaultRouter()
router.register('', CartViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
