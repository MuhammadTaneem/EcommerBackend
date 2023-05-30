from django.urls import include, path
from rest_framework import routers
from .views import RattingViewSet

router = routers.DefaultRouter()
router.register('', RattingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
