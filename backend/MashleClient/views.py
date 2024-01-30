from django.shortcuts import render
from django.http import HttpResponse
from django.views import View

# Create your views here.
class HomeView(View):
    def get(self, request):
        content = "<h1>Hello World</h1>"
        return HttpResponse(content)