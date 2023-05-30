import sys
sys.path.append("..")
from products.models import Product
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from .models import Cart
from .serializers import CartSerializer
from rest_framework import serializers


class CartViewSet(ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    # lookup_field = 'author'0
    def get_queryset(self):
        queryset = Cart.objects.filter(author=self.request.user)
        return queryset

    def perform_create(self, serializer):
        print(self.request.data['product_id'])
        product = Product.objects.get(pk=self.request.data['product_id'])
        serializer.save(author=self.request.user,
                        product_name=product.name,
                        product_price=product.price * int(self.request.data['quantity']),
                        product_img=product.product_img1, )

    def perform_update(self, serializer):
        print(self.request.data)
        product = Product.objects.get(pk=self.request.data['product_id'])
        cart = Cart.objects.get(pk=self.request.data['id'])
        # import pdb; pdb.set_trace()
        print(cart.quantity)
        if cart.quantity > self.request.data['quantity']:
            pass
        elif product.quantity < self.request.data['quantity']:
            raise serializers.ValidationError({'error': 'Stock out'})
        serializer.save(author=self.request.user,
                        product_price=product.price * int(self.request.data['quantity']))
