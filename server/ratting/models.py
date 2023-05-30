from django.db import models
# from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
# User = get_user_model()
import sys
sys.path.append("..")
from products.models import Product
from users.models import User


class Ratting(models.Model):
    star = models.IntegerField(null=False, blank=False, default=1, validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ])
    comment = models.CharField(max_length=1024, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=False, blank=False, default='customer')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        if self.product.name:
            return self.product.name
        else:
            return self.star

