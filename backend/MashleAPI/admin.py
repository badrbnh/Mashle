from django.contrib import admin
from .models import MenuItems, Category, CartItems, Cart, Order
# Register your models here.
admin.site.register(Category)
admin.site.register(MenuItems)
admin.site.register(CartItems)
admin.site.register(Cart)
admin.site.register(Order)