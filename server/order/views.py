import sys
from rest_framework import serializers
from django.core.mail import send_mail
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from .models import Order
from .serializers import OrderSerializer

sys.path.append("..")
from permissions.permissions import AuthorOrReadOnly
from cart.models import Cart
from products.models import Product
from django.contrib.auth import get_user_model

User = get_user_model()


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    # permission_classes = [permissions.IsAuthenticated | AuthorOrReadOnly]

    # lookup_field = 'author'

    # if is_staff send all order otherwise send only user order
    def get_queryset(self):
        r_user = self.request.user
        if self.request.query_params.get('all') == 'all':
            if r_user.is_staff or r_user.is_superuser:
                queryset = Order.objects.all()
        elif self.request.query_params.get('update') == 'update':
            if r_user.is_staff or r_user.is_superuser:
                queryset = Order.objects.all()
        else:
            queryset = Order.objects.filter(author=self.request.user)
        return queryset

    def perform_create(self, serializer):
        print(self.request.data)

        print('Cart loading...')
        cart = Cart.objects.get(pk=self.request.data['cart_id'])
        print('Cart loaded...')
        product = Product.objects.get(pk=self.request.data['product'])
        print('Product loaded...')
        user = self.request.user
        # product update
        if product.quantity >= cart.quantity:
            product.quantity = product.quantity - cart.quantity
            product.save()
            # cart remove
            cart.delete()
        else:
            raise serializers.ValidationError({'error': 'Stock out'})

        current_order = serializer.save(author=self.request.user, bill=cart.product_price, product=product)
        send_mail(
            'Order confirmation',
            f"Dear {user.first_name} {user.last_name},\nyour order  is confirmed.\nProduct name:\t{self.request.data['product_name']}\nQuantity :\t{self.request.data['quantity']}\nBill:\t{current_order.bill} taka\nOrder id:\t{current_order.id}.\nThanks for your using Floric.\nIT department of Floric.",
            None,
            [user.email],
            fail_silently=True,
        )

    def perform_update(self, serializer):
        # import pdb;
        # pdb.set_trace();
        author_id = self.request.data['author']
        user = User.objects.get(pk=author_id)

        send_mail(
            'Order Status Update',
            f"Dear {user.first_name} {user.last_name},\nyour order  is {self.request.data['status']}.\nProduct name:\t{self.request.data['product_name']}\nQuantity :\t{self.request.data['quantity']}\nBill:\t{self.request.data['bill']} taka\nOrder id:\t{self.request.data['bill']}.\nThanks for your using Floric.\nIT department of Floric.",
            None,
            [user.email],
            fail_silently=True,
        )
        # serializer.save(author=self.request.user)


class SingleOrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated | AuthorOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            queryset = Order.objects.all()
        else:
            queryset = Order.objects.filter(author=self.request.user)
        return queryset

    def perform_create(self, serializer):
        print(self.request.data)
        product = Product.objects.get(pk=self.request.data['product'])
        user = self.request.user
        print(user)
        # product update
        if product.quantity > 0:
            product.quantity = product.quantity - 1
            product.save()
        else:
            raise serializers.ValidationError({'error': 'Stock out'})

        current_order = serializer.save(author=self.request.user, bill=product.price, product=product)
        send_mail(
            'Order confirmation',
            f"Dear {user.first_name} {user.last_name},\nyour order  is confirmed.\nProduct name:\t{product.name}\nQuantity :\t{self.request.data['quantity']}\nBill:\t{current_order.bill} taka\nOrder id:\t{current_order.id}.\nThanks for your using Floric.\nIT department of Floric.",
            None,
            [user.email],
            fail_silently=True,
        )
