from django.urls import path
from .views import *

urlpatterns = [
    path('chat', index, name='chat'),
    path('get', get_response, name="get_response")
]