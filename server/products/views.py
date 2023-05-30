from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
# from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.filters import SearchFilter, OrderingFilter
import sys

sys.path.append("..")
from pagination.pagination import CustomPagination
from permissions.permissions import ReadOnly, StaffOrReadOnly


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.AllowAny]
    # lookup_field = 'author'0
    # def get_queryset(self):
    #     queryset = User.objects.filter(id=self.request.query_params.get('id'))
    #     return queryset
    #
    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)
    #
    # def perform_update(self, serializer):
    #     serializer.save(author=self.request.user)


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    permission_classes = [StaffOrReadOnly]
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('name', 'description', 'color', 'brand', 'product_category__name')
    pagination_class = CustomPagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)


@api_view(['GET'])
def get_category_product(request):
    print(request.get_host())
    domain = request.get_host()
    queryset = Product.objects.all()
    if request.query_params.get('id'):
        queryset = Product.objects.filter(product_category=request.query_params.get('id'))
    serializer = ProductSerializer(queryset, many=True)
    for i in range(serializer.data.__len__()):
        serializer.data[i]['product_img1'] = 'http://' + domain + serializer.data[i]['product_img1']
        serializer.data[i]['product_img2'] = 'http://' + domain + serializer.data[i]['product_img2']
        serializer.data[i]['product_img3'] = 'http://' + domain + serializer.data[i]['product_img3']
        serializer.data[i]['product_img4'] = 'http://' + domain + serializer.data[i]['product_img4']
        print(serializer.data[i]['product_img1'])

    return Response({'count': serializer.data.__len__(), 'results': serializer.data})
