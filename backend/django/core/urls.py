from django.contrib import admin
from django.urls import path, include, get_resolver
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework.decorators import api_view, permission_classes


@permission_classes([AllowAny])
@api_view(["GET"])
def index(request):
    resolver = get_resolver()
    urls = []

    def fetch_urls(urlpatterns, base=""):
        for pattern in urlpatterns:
            full_path = base + str(pattern.pattern)
            if full_path.startswith("admin/"):

                continue

            if hasattr(pattern, "url_patterns"):
                fetch_urls(pattern.url_patterns, full_path)

            else:  # Add individual pattern
                urls.append(full_path)

    fetch_urls(resolver.url_patterns)
    # print(urls)
    return Response(
        {
            "message": "Welcome to Toza Hub API",
            "urls": urls,
        }
    )


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
# print(urlpatterns)
