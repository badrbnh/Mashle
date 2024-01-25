from django.shortcuts import render, HttpResponse
from .models import MenuItems, Order, Cart, OrderItems, CartItems
from .serializers import MenuItemSerializer, CartItemsSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User, Group
# Create your views here.

"""API's Endpoints"""

class MenuItemsView(generics.ListCreateAPIView):
    """API that lists and creates Menu items"""
    queryset = MenuItems.objects.all()
    serializer_class = MenuItemSerializer
    
    def create(self, request, *args, **kwargs):
        if not request.user.groups.filter(name='Manager').exists():
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().create(request, *args, **kwargs)
    

class MenuItemView(generics.RetrieveUpdateDestroyAPIView):
    """API that retrieves, updates, and destroys Menu items"""
    queryset = MenuItems.objects.all()
    serializer_class = MenuItemSerializer
    
    def update(self, request, *args, **kwargs):
        if not request.user.groups.filter(name='Manager').exists():
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if not request.user.groups.filter(name='Manager').exists():
            return Response({"message": "You are not authorized for this action"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().destroy(request, *args, **kwargs)

class CartitemsView(generics.ListCreateAPIView):
    """API that list and add items to cart"""
    
    queryset = CartItems.objects.all()
    serializer_class = CartItemsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return the cart items for the current user
        return CartItems.objects.filter(cart__user=self.request.user)
