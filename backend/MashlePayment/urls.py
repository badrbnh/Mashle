from django.urls import path
from .views import *

urlpatterns =[
    path('create-checkout-session/', StripeCheckoutView.as_view()),
    path('personal-details/', PersonalDetailsView.as_view()),
    path('personal-details/<int:pk>/', SinglePersonalDetailView.as_view()),
    path('current-personal-details/', CurrentPersonalDetailsView.as_view()),
    path('current-personal-details/<int:pk>/', CurrentPersonalDetailView.as_view()),

]