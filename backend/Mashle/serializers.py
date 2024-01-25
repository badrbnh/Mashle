"""Serializers for the models"""

from rest_framework import serializers
from .models import MenuItems, Category, Cart, CartItems
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
    
class CartItemsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        default=serializers.CurrentUserDefault()
    )
    menuitem = MenuItemSerializer()

    def validate(self, attrs):
        # Retrieve the actual menu item price and calculate the total price
        menuitem = attrs['menuitem']
        attrs['unit_price'] = menuitem.price
        attrs['price'] = attrs['unit_price'] * attrs.get('quantity', 1)
        return attrs

    class Meta:
        model = CartItems
        fields = ['user', 'menuitem', 'unit_price', 'quantity', 'price']
        extra_kwargs = {
            'price': {'read_only': True}
        }
