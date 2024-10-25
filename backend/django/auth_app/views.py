from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import (
    UserDetailSerializer,
    UserRegistrationSerializer,
    CustomTokenObtainPairSerializer,
)
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from drf_spectacular.utils import (
    extend_schema,
    OpenApiResponse,
    OpenApiExample,
)
from .models import User


@extend_schema(
    summary="Get user details",
    request=None,  # No parameters in the request
    responses={
        200: OpenApiResponse(
            response=UserDetailSerializer,
            description="User details retrieved successfully",
        )
    },
    examples=[
        OpenApiExample(
            "Example response",
            value={
                "email": "user@example.com",
                "username": "string",
                "password": "string",
                "first_name": "string",
                "last_name": "string",
            },
        ),
    ],
)
@api_view(["GET"])
def user_detail(request):
    user = request.user
    serializer = UserDetailSerializer(user)
    return Response(serializer.data)


class UserCreateApiView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Create a new user",
        description="Create a new user",
    )
    def post(self, request, *args, **kwargs):
        data = request.data
        data["is_sacco_admin"] = True
        serializer = UserRegistrationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "User created successfully",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def signup(request):
    data = request.data
    data["is_sacco_admin"] = True
    serializer = UserRegistrationSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "message": "User created successfully",
            },
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    @extend_schema(
        summary="Login",
        description="Login to the application to obtain JWT tokens.",
        examples=[
            OpenApiExample(
                "Login Response Example",
                value={
                    "access": "your_access_token",
                    "refresh": "your_refresh_token",
                    "is_sacco_admin": "boolean",
                },
                response_only=True,
            ),
        ],
    )
    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.get(username=request.data["username"])
            response = super().post(request, *args, **kwargs)
            response.data["is_sacco_admin"] = user.is_sacco_admin
            print(response.data)
            return Response(response.data)
        except User.DoesNotExist:
            return Response(
                {"error": "User does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
