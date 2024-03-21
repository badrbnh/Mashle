from rest_framework import serializers
from decimal import Decimal
from .models import MenuItems, Category, Cart, CartItems, Order, OrderItems, Reservation, Reviews, Table
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model."""
    class Meta:
        model = Category
        fields = ['id', 'title']

class MenuItemSerializer(serializers.ModelSerializer):
    """Serializer for MenuItems model."""
    category_id = serializers.PrimaryKeyRelatedField(
        source='category',
        queryset=Category.objects.all(),
        write_only=True
    )
    category = CategorySerializer(read_only=True)
    class Meta:
        model = MenuItems
        fields = ['id', 'title', 'price', 'description','category', 'category_id', 'image']

class CartSerializer(serializers.ModelSerializer):
    """Serializer for Cart model."""
    user_id = serializers.PrimaryKeyRelatedField(
        source='user',
        queryset=User.objects.all(),
        write_only=True
    )

    class Meta:
        model = Cart
        fields = ['id', 'user_id']

class CartItemsSerializer(serializers.ModelSerializer):
    """Serializer for CartItems model."""
    user = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(),
        read_only=True
    )
    menuitem_id = serializers.PrimaryKeyRelatedField(
        source='menuitem',
        queryset=MenuItems.objects.all(),
    )
    cart_id = serializers.PrimaryKeyRelatedField(
        source='cart',
        queryset=Cart.objects.all(),
        write_only=True
    )

    def validate(self, attrs):
        # Retrieve the actual menu item price and calculate the total price
        menuitem = attrs['menuitem']
        attrs['unit_price'] = menuitem.price
        attrs['price'] = attrs['unit_price'] * attrs.get('quantity', 1)
        return attrs

    class Meta:
        model = CartItems
        fields = ['user', 'cart_id', 'menuitem_id', 'quantity', 'price']
        extra_kwargs = {
            'price': {'read_only': True}
        }

class OrderItemsSerializer(serializers.ModelSerializer):
    """Serializer for OrderItems model."""
    cart_item = CartItemsSerializer(read_only=True)

    class Meta:
        model = OrderItems
        fields = ['id', 'cart_item', 'price']
        read_only_fields = ['price']

class OrderSerializer(serializers.ModelSerializer):
    """Serializer for Order model."""
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        default=serializers.CurrentUserDefault(),
    )
    order_items = OrderItemsSerializer(many=True, read_only=True, source='orderitems_set')
    total = serializers.DecimalField(read_only=True, max_digits=6, decimal_places=2)

    class Meta:
        model = Order
        fields = ['id', 'user', 'total', 'status', 'order_items']
        read_only_fields = ['total']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        order_items = representation['order_items']

        # Calculate the total based on order_items
        total_price = sum(Decimal(item['price']) for item in order_items)
        representation['total'] = total_price

        return representation

class ReviewSerializer(serializers.ModelSerializer):
    """Serializer for Reviews model."""
    class Meta:
        model = Reviews
        fields = ['id', 'username', 'content', 'stars']

class TableSerializer(serializers.ModelSerializer):
    """Serializer for Table model."""
    STATUS_CHOICES = [
        (Table.OCCUPIED, 'Occupied'),
        (Table.AVAILABLE, 'Available'),
    ]

    status = serializers.ChoiceField(choices=STATUS_CHOICES)

    class Meta:
        model = Table
        fields = ['id', 'number', 'capacity', 'status']

class ReservationSerializer(serializers.ModelSerializer):
    """Serializer for Reservation model."""
    STATUS_CHOICES = [
        (Reservation.PENDING, 'Pending'),
        (Reservation.CONFIRMED, 'Confirmed'),
        (Reservation.CANCELED, 'Canceled'),
    ]
    table_id = serializers.PrimaryKeyRelatedField(
        source='table',
        queryset=Table.objects.all(),
        write_only=True
    )
    status = serializers.ChoiceField(choices=STATUS_CHOICES, read_only=True)
    user = serializers.ReadOnlyField(source='user.username')
    table = serializers.ReadOnlyField(source='table.number')

    class Meta:
        model = Reservation
        fields = ['id', 'user', 'table', 'table_id', 'date', 'time', 'status']

class UserSerilializer(serializers.ModelSerializer):
    """Serializer for User model"""
    class Meta:
        model = User
        fields = ['id','username','email']