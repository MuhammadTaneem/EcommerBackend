from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
import sys
sys.path.append("..")
from products.models import Product



class Cart(models.Model):
    quantity = models.IntegerField(null=False, blank=False, default=1)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    product_img = models.ImageField(upload_to='images/carts/', null=False, blank=False, default='images/floric.jpg')
    # product_name = models.CharField(max_length=512, null=False, default=Product.name)
    # product_price = models.FloatField(null=False, default=Product.price)
    product_name = models.CharField(max_length=512, null=False, default='item')
    product_price = models.FloatField(null=False, default=0.00)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.product_name