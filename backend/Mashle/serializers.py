from rest_framework import serializers
from .models import MenuItems, Category, Cart, CartItems, Order, OrderItems
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']

class MenuItemSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        source='category',
        queryset=Category.objects.all(),
        write_only=True
    )
    category = CategorySerializer(read_only=True)
    class Meta:
        model = MenuItems
        fields = ['id', 'title', 'price', 'description','category', 'category_id']

class CartSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        source='user',
        queryset=User.objects.all(),
        write_only=True
    )

    class Meta:
        model = Cart
        fields = ['id', 'user_id']


class CartItemsSerializer(serializers.ModelSerializer):
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
    cart_item = CartItemsSerializer(read_only=True)

    class Meta:
        model = OrderItems
        fields = ['id', 'cart_item', 'price']
        read_only_fields = ['price']

class OrderSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        default=serializers.CurrentUserDefault(),
    )
    order_items = OrderItemsSerializer(many=True, read_only=True, source='orderitems_set')

    class Meta:
        model = Order
        fields = ['id', 'user', 'total', 'status', 'order_items']
        read_only_fields = ['total']

