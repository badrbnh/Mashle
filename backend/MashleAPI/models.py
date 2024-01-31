from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    """Model representing a category for menu items."""
    title = models.CharField(max_length=255, verbose_name="Title", unique=True, db_index=True)

    def __str__(self):
        return self.title

class MenuItems(models.Model):
    """Model representing menu items."""
    STOCK_CHOICES = [
        ('In Stock', 'In Stock'),
        ('Out of Stock', 'Out of Stock'),
        ('Limited Stock', 'Limited Stock'),
    ]

    title = models.CharField(max_length=255, verbose_name="Title", unique=True, db_index=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price")
    description = models.TextField(verbose_name="Description")
    stock = models.CharField(max_length=15, choices=STOCK_CHOICES, default='In Stock', verbose_name="Stock")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name="Category")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Menu Items"


class Cart(models.Model):
    """Model representing a user's cart."""
    user = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name="User")

    def __str__(self):
        return f"{self.user}'s Cart"

    class Meta:
        verbose_name_plural = "Carts"

class CartItems(models.Model):
    """Model representing items in a user's cart."""
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
    """Model representing an order."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.BooleanField(default=0, db_index=True)
    total = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    date = models.DateField(db_index=True, auto_now_add=True)
    
    def __str__(self):
        return f"{self.user}'s order"


class OrderItems(models.Model):
    """Model representing items in an order."""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name="Order")
    menuitem = models.ForeignKey(MenuItems, on_delete=models.CASCADE, verbose_name="Menu Item")
    quantity = models.SmallIntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

    class Meta:
        unique_together = ('order', 'menuitem')

class Reviews(models.Model):
    """Model representing user reviews."""
    STAR_CHOICES = [
        (1, '1 Star'),
        (2, '2 Stars'),
        (3, '3 Stars'),
        (4, '4 Stars'),
        (5, '5 Stars'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255)  # Corrected typo: usrrname to username
    content = models.TextField(verbose_name="Content")
    stars = models.IntegerField(choices=STAR_CHOICES, verbose_name="Stars")

    def __str__(self):
        return f"{self.username}'s Review"

    class Meta:
        verbose_name_plural = "Reviews"

class Table(models.Model):
    """Model representing tables in the restaurant."""
    OCCUPIED = 'occupied'
    AVAILABLE = 'available'

    STATUS_CHOICES = [
        (OCCUPIED, 'Occupied'),
        (AVAILABLE, 'Available'),
    ]

    number = models.SlugField(unique=True)
    capacity = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=AVAILABLE)

    def __str__(self):
        return f"Table {self.number}"

class Reservation(models.Model):
    """Model representing reservations."""
    PENDING = 'pending'
    CONFIRMED = 'confirmed'
    CANCELED = 'canceled'

    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (CONFIRMED, 'Confirmed'),
        (CANCELED, 'Canceled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)

    def __str__(self):
        return f"Reservation for {self.user} at {self.table} on {self.date} {self.time}"
