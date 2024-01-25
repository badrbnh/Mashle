from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    """Model of category"""
    slug = models.SlugField()
    title = models.CharField(max_length=255)  # Add max_length attribute
    
    def __str__(self):
        return self.title

class MenuItems(models.Model):
    """Model of menu items"""
    title = models.CharField(max_length=255)  # Add max_length attribute
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    
    def __str__(self):
        return self.title

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)

class CartItems(models.Model):
    menuitem = models.ForeignKey(MenuItems, on_delete=models.PROTECT)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)  # Add quantity field with a default value
    price = models.DecimalField(max_digits=10, decimal_places=2)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50)  # Add max_length attribute

class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)  # Use models.CASCADE
    menuitem = models.ForeignKey(MenuItems, on_delete=models.PROTECT)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
