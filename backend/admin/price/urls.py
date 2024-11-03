from django.urls import path
# from .views import update_price, get_price
from . import views

urlpatterns = [
    path('login/', views.LoginView.as_view(), name = 'login_view'),
    path('update_price/', views.update_price, name = 'update_price'),
    path('get_price/', views.get_price, name = "get_price")
]