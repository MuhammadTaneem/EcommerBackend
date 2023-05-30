import sys
sys.path.append("..")
from products.models import Product
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
User = get_user_model()


class Order(models.Model):
    quantity = models.IntegerField(null=False, blank=False, default=1)
    order_time = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=1023, null=True, blank=True)
    product_img = models.CharField(max_length=1023, null=True, blank=True)
    bill = models.IntegerField(null=False, blank=False, default=None)
    status = models.CharField(max_length=15, null=True, blank=True, default='Processing')
    phone = models.CharField(max_length=15, null=False, blank=False, default=None)
    address = models.CharField(max_length=1023, null=True, blank=True)

    def __str__(self):
        return self.product.name
