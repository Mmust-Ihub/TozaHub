from django.urls import path
from . import views

urlpatterns = [
    path(
        "signup/",
        views.signup,
        name="signup",
    ),
    path(
        "signup-test/",
        views.UserCreateApiView.as_view(),
        name="signup-test",
    ),
]
