from django.shortcuts import render

# Create your views here.
from .models import Ratting
from .serializers import RattingSerializer
# from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.filters import SearchFilter, OrderingFilter
import sys

sys.path.append("..")
from permissions.permissions import AuthorOrReadOnly


class RattingViewSet(ModelViewSet):
    queryset = Ratting.objects.all()
    serializer_class = RattingSerializer
    permission_classes = [AuthorOrReadOnly]

    # lookup_field = 'author'0

    def get_queryset(self):
        queryset = Ratting.objects.filter(product=self.request.query_params.get('id'))
        return queryset

    def perform_create(self, serializer):
        # import pdb; pdb.set_trace()
        serializer.save(author=self.request.user, name=self.request.user.first_name + ' ' + self.request.user.last_name)

# class ProductViewSet(ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     permission_classes = [permissions.AllowAny]
#     filter_backends = (SearchFilter, OrderingFilter)
#     search_fields = ('name', 'description', 'color', 'brand', 'price', 'product_category__category')
#     pagination_class = CustomPagination
#
#     # lookup_field = 'author'0
#
#     # def get_queryset(self):
#     #     queryset = User.objects.filter(id=self.request.query_params.get('id'))
#     #     return queryset
#
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)
#
#     def perform_update(self, serializer):
#         serializer.save(author=self.request.user)
