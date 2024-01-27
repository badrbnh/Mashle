from datetime import datetime
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import MenuItems, Cart, CartItems, Order, OrderItems
from .serializers import MenuItemSerializer, CartItemsSerializer, CartSerializer, OrderSerializer, OrderItemsSerializer

class ManagerPermissionMixin:
    """Mixin to check manager permission."""
    def has_manager_permission(self, request):
        return request.user.groups.filter(name='Manager').exists()

class MenuItemsView(generics.ListCreateAPIView, ManagerPermissionMixin):
    """API that lists and creates Menu items."""

    queryset = MenuItems.objects.all()
    serializer_class = MenuItemSerializer

    def create(self, request, *args, **kwargs):
        if not self.has_manager_permission(request):
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().create(request, *args, **kwargs)

class MenuItemView(generics.RetrieveUpdateDestroyAPIView, ManagerPermissionMixin):
    """API that retrieves, updates, and destroys Menu items."""

    queryset = MenuItems.objects.all()
    serializer_class = MenuItemSerializer

    def update(self, request, *args, **kwargs):
        if not self.has_manager_permission(request):
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if not self.has_manager_permission(request):
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().destroy(request, *args, **kwargs)

class CartView(generics.ListCreateAPIView):
    """API that lists and creates cart for the user."""
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Only return the cart for the current user."""
        return Cart.objects.filter(user=self.request.user)

class CartItemsView(generics.ListCreateAPIView):
    """API that lists and adds items to the cart."""
    serializer_class = CartItemsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Only return the cart items for the current user."""
        return CartItems.objects.filter(cart__user=self.request.user)

class SingleCartItemsView(generics.RetrieveUpdateDestroyAPIView):
    """API that retrieves, updates, and destroys a single cart item."""
    serializer_class = CartItemsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Only return the cart items for the current user."""
        return CartItems.objects.filter(cart__user=self.request.user)

class OrderView(generics.ListCreateAPIView):
    """API that list/create all orders of a user."""
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Only return the cart items for the current user."""
        return Order.objects.filter(user=self.request.user)
    
class OrderItemsView(generics.ListCreateAPIView):
    """API that list/creat the order items."""
    serializer_class = OrderItemsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Only return the cart items for the current user."""
        return OrderItems.objects.filter(order__user=self.request.user)

    def create_order_and_items(self, user):
        """Create a new order and associated order items."""
        user_cart_items = CartItems.objects.filter(cart__user=user)
        new_order = Order.objects.create(user=user, status=False)

        for cart_item in user_cart_items:
            OrderItems.objects.create(
                order=new_order,
                menuitem=cart_item.menuitem,
                quantity=cart_item.quantity,
                price=cart_item.price
            )

        # Clear the user's cart
        user_cart_items.delete()

        return new_order

    def create(self, request, *args, **kwargs):
        new_order = self.create_order_and_items(request.user)
        serializer = self.serializer_class(new_order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

