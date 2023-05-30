from rest_framework import serializers
from .models import Cart
import sys
sys.path.append("..")
from products.models import Product


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"
    # def validate(self, data):
    #     product = Product.objects.get(pk=data['product_id'].id)
    #     print(data)
    #     # print(Cart.objects.get(pk=data['id']))
    #     # if Cart.quantity > data['quantity']:
    #     #     return data
    #     if product.quantity < data['quantity']:
    #         raise serializers.ValidationError({'error': 'Stock out'})
    #     return data
