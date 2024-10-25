from django.contrib import admin
from django.urls import path, include
from rest_framework.response import Response
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework.decorators import api_view


@api_view(["GET"])
def index(request):
    return Response({"message": "Welcome to Toza Hub API"})


urlpatterns = [
    path("", index, name="index"),
    path("admin/", admin.site.urls),
    path(
        "schema/",
        SpectacularAPIView.as_view(),
        name="schema",
    ),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
    path(
        "api/auth/",
        include("auth_app.urls"),
        name="register",
    ),
    path(
        "api/",
        include("sacco.urls"),
        name="sacco",
    ),
]

