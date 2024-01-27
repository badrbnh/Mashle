from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    slug = models.SlugField()
    title = models.CharField(max_length=255, verbose_name="Title")

    def __str__(self):
        return self.title

class MenuItems(models.Model):
    title = models.CharField(max_length=255, verbose_name="Title")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price")
    description = models.TextField(verbose_name="Description")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name="Category")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Menu Items"

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name="User")

    def __str__(self):
        return f"{self.user}'s Cart"

    class Meta:
        verbose_name_plural = "Carts"

class CartItems(models.Model):
    menuitem = models.ForeignKey(MenuItems, on_delete=models.PROTECT, verbose_name="Menu Item")
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, verbose_name="Cart")
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Unit Price")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Quantity")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price")

    def __str__(self):
        return f"{self.cart}'s {self.menuitem}"

    class Meta:
        verbose_name_plural = "Cart Items"
        unique_together = ['cart', 'menuitem']  # Assuming a menu item can appear only once in a cart

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.BooleanField(default=0, db_index=True)
    total = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    date = models.DateField(db_index=True, auto_now_add=True)


class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name="Order")
    menuitem = models.ForeignKey(MenuItems, on_delete=models.CASCADE, verbose_name="Menu Item")
    quantity = models.SmallIntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

    class Meta:
        unique_together = ('order', 'menuitem')
