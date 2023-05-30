from django.shortcuts import redirect
# from .models import User

from django.contrib.auth import get_user_model

User = get_user_model()
from .serializers import UserDetailSerializer
import sys

sys.path.append("..")
from permissions.permissions import AuthorOrReadOnly
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from djoser.views import UserViewSet

FrontEndUrl = 'http://localhost:4200/'


# FrontEndUrl = 'http://10.10.0.220:4200/'


class UserViewSet(UserViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated, AuthorOrReadOnly | IsAdminUser]

    # lookup_field = 'author'0
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser and not self.request.query_params.get('uid'):
            queryset = User.objects.all()
        else:
            queryset = User.objects.filter(id=self.request.query_params.get('uid'))
        return queryset

    # def get_queryset(self):
    #     queryset = User.objects.filter(id=self.request.query_params.get('uid'))
    #     return queryset
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)


def RedirectView(self, uid, token):
    # FrontEndUrl = 'http://localhost:4200/'
    return redirect(f'{FrontEndUrl}#/auth/password/reset/confirm/{uid}/{token}/')


def ActiveView(self, uid, token):
    # FrontEndUrl = 'http://localhost:4200/'
    return redirect(f'{FrontEndUrl}#auth/activate/{uid}/{token}/')
