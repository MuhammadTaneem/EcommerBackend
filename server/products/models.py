from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    cat_img = models.ImageField(upload_to='images/category/', null=False, blank=False, default='images/floric.jpg')

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=511, null=False)
    description = models.CharField(max_length=5119, null=False)
    weight = models.CharField(max_length=1023, null=True, blank=True)
    quantity = models.IntegerField(null=False, blank=False, default=0)
    color = models.CharField(max_length=255, null=True, blank=True)
    brand = models.CharField(max_length=255, null=True, blank=True)
    model = models.CharField(max_length=255, null=True, blank=True)
    price = models.FloatField(null=False)
    size = models.CharField(max_length=255, null=True, blank=True)
    posted_time = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    product_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_img1 = models.ImageField(upload_to='images/products/', null=False, blank=False, default='images/floric.jpg')
    product_img2 = models.ImageField(upload_to='images/products/', null=True, blank=True, default='images/floric.jpg')
    product_img3 = models.ImageField(upload_to='images/products/', null=True, blank=True, default='images/floric.jpg')
    product_img4 = models.ImageField(upload_to='images/products/', null=True, blank=True, default='images/floric.jpg')

    def __str__(self):
        return self.name
#
#
# class PostImage(models.Model):
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     author = models.ForeignKey(User, on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='images/', null=True, blank=False)
#
#     def __str__(self):
#         return self.post.category
#
#
# class Comment(models.Model):
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     author = models.ForeignKey(User, on_delete=models.CASCADE)
#     author_name = models.CharField(max_length=100, null=False, default='viewer')
#     comment_time = models.DateTimeField(default=timezone.now)
#     content = models.TextField(max_length=1000, null=False)
#
#     def __str__(self):
#         return self.post.category
