from datetime import datetime
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.contrib.auth.models import User
from .models import Category, MenuItems, Cart, CartItems, Order, OrderItems, Table, Reservation, Reviews
from .serializers import CategorySerializer, MenuItemSerializer, CartItemsSerializer,\
    CartSerializer, OrderSerializer, OrderItemsSerializer, ReservationSerializer, ReviewSerializer, TableSerializer

class ManagerPermissionMixin:
    """Mixin to check manager permission."""
    def has_manager_permission(self, request):
        return request.user.groups.filter(name='Manager').exists()

class ManagerPermission(BasePermission, ManagerPermissionMixin):
    """
    Custom permission to check if the user has 'Manager' group permission.
    """

    def has_permission(self, request, view):
        # Use ManagerPermissionMixin to check manager permission
        return view.has_manager_permission(request)

class CategoryView(generics.ListCreateAPIView, ManagerPermissionMixin):
    """API that lists and creates Categories."""
    
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        """Only Managers can create a category."""
        if not self.has_manager_permission(request):
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().create(request, *args, **kwargs)

class SingleCategoryView(generics.RetrieveUpdateDestroyAPIView, ManagerPermissionMixin):
    """API that lists and creates Categories."""
    
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def update(self, request, *args, **kwargs):
        """Only managers can update"""
        if not self.has_manager_permission(request):
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        super().update(request, *args, **kwargs)
        return Response({"message": "ok"}, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        """Only managers can destroy"""
        if not self.has_manager_permission(request):
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        super().destroy(request, *args, **kwargs)
        return Response({"message": "ok"}, status=status.HTTP_200_OK)

class MenuItemsView(generics.ListCreateAPIView, ManagerPermissionMixin):
    """API that lists and creates Menu items."""

    queryset = MenuItems.objects.all()
    serializer_class = MenuItemSerializer
    search_fields = ['category__title']
    ordering_fields = ['price']

    def create(self, request, *args, **kwargs):
        """Only managers can create"""
        if not self.has_manager_permission(request):
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        super().create(request, *args, **kwargs)
        return Response({"message": "ok"}, status=status.HTTP_200_OK)

class MenuItemView(generics.RetrieveUpdateDestroyAPIView, ManagerPermissionMixin):
    """API that retrieves, updates, and destroys Menu items."""

    queryset = MenuItems.objects.all()
    serializer_class = MenuItemSerializer

    def update(self, request, *args, **kwargs):
        """Only managers can update"""
        if not self.has_manager_permission(request):
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        super().update(request, *args, **kwargs)
        return Response({"message": "ok"}, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        """Only managers can destroy"""
        if not self.has_manager_permission(request):
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        super().destroy(request, *args, **kwargs)
        return Response({"message": "ok"}, status=status.HTTP_200_OK)

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

class OrderView(generics.ListAPIView):
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


class ReviewView(generics.ListCreateAPIView):
    """API view to list and create reviews."""
    queryset = Reviews.objects.all().order_by('-id')
    serializer_class = ReviewSerializer

class SingleReviewView(generics.RetrieveUpdateDestroyAPIView):
    """API view to retrieve, update and delete"""
    queryset = Reviews.objects.all()
    serializer_class = ReviewSerializer

class TableView(generics.ListCreateAPIView, ManagerPermissionMixin):
    """API view to list and create tables."""
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [ManagerPermission]

class SingleTableView(generics.RetrieveUpdateDestroyAPIView, ManagerPermissionMixin):
    """API view to retrieve, update and delete"""
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [ManagerPermission]

class ReservationView(generics.ListCreateAPIView, ManagerPermissionMixin):
    """API view to list and create reservations."""
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Only return reservations for the current user or authorized manager."""
        if not self.has_manager_permission(self.request):
            return Reservation.objects.filter(user=self.request.user)
        else:
            return Reservation.objects.all()

    def perform_create(self, serializer):
        """Automatically set the user for the reservation."""
        serializer.save(user=self.request.user)

class SingleReservationView(generics.RetrieveUpdateDestroyAPIView):
    """API view to retrieve, update, and delete a reservation."""
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

