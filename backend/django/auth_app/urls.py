from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path(
        "login/",
        views.CustomTokenObtainPairView.as_view(),
        name="login",
    ),
    path(
        "refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path(
        "signup/",
        views.UserCreateApiView.as_view(),
        name="signup",
    ),
    path(
        "user/",
        views.user_detail,
        name="signup",
    ),
]
