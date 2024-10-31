from django.urls import path
from .views import update_price, get_price

url_patterns = [
    path('update_price/', update_price, name = 'update_price'),
    path('get_price/', get_price, name = "get_price")
]