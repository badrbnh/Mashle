from django.urls import path
from . import views

urlpatterns = [
    path("api/menu-items", views.MenuItemsView.as_view(), name="menu-items"),
    path("api/menu-items/<int:pk>", views.MenuItemView.as_view(), name="menu-item"),
    path("api/carts", views.CartView.as_view(), name="carts"),
    path("api/cart-items", views.CartItemsView.as_view(), name="cart-items"),
    path("api/cart-items/<int:pk>", views.SingleCartItemsView.as_view(), name="single-cart-item"),
    path("api/orders", views.OrderView.as_view(), name="orders"),
    path("api/order-items", views.OrderItemsView.as_view(), name="order-items"),
]
