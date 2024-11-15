from django.conf import settings
from django.conf.urls.static import static
from django.urls import path


from . import views

urlpatterns = [
    path("categories/", views.CategoryView.as_view(), name="categories"),
    path("categories/<int:pk>", views.SingleCategoryView.as_view(), name="category"),
    path("menu-items/", views.MenuItemsView.as_view(), name="menu-items"),
    path("menu-items/<int:pk>", views.MenuItemView.as_view(), name="menu-item"),
    path("carts", views.CartView.as_view(), name="carts"),
    path("cart-items/", views.CartItemsView.as_view(), name="cart-items"),
    path("cart-items/<int:pk>", views.SingleCartItemsView.as_view(), name="single-cart-item"),
    path("orders", views.OrderView.as_view(), name="orders"),
    path("order-items", views.OrderItemsView.as_view(), name="order-items"),
    path("reviews", views.ReviewView.as_view(), name="reviews"),
    path("reviews/<int:pk>", views.SingleReviewView.as_view(), name="single-review"),
    path("tables", views.TableView.as_view(), name="tables"),
    path("tables/<int:pk>", views.SingleTableView.as_view(), name="single-table"),
    path("reservations", views.ReservationView.as_view(), name="reservations"),
    path("reservations/<int:pk>", views.SingleReservationView.as_view(), name="single-reservation"),
    path('groups/manager/users', views.ManagerViewSet.as_view(
        {'get': 'list', 'post': 'create', 'delete': 'destroy'})),

    path('groups/delivery-crew/users', views.DeliveryCrewViewSet.as_view(
        {'get': 'list', 'post': 'create', 'delete': 'destroy'})),

    path('groups/chef/users', views.ChefViewSet.as_view(
        {'get': 'list', 'post': 'create', 'delete': 'destroy'})),

    path('groups/waiter/users', views.WaiterViewSet.as_view(
        {'get': 'list', 'post': 'create', 'delete': 'destroy'})),

    path('groups/cashier/users', views.CashierViewSet.as_view(
        {'get': 'list', 'post': 'create', 'delete': 'destroy'})),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
