from django.urls import path
from . import views
from django.contrib.auth.views import UserModel
urlpatterns = [
    path("api/menu-items", views.MenuItemsView.as_view(), name="menu-items"),
    path("api/menu-items/<int:pk>", views.MenuItemView.as_view(), name="menu-item"),
    path("api/cart", views.CartItemsView.as_view(), name="cart"),
    path("api/cart/<int:pk>", views.SingleCartItemsView.as_view(), name="single-cart"),
]
