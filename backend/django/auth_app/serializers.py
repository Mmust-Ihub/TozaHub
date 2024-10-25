from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample
from .models import User


class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "first_name",
            "last_name",
            "is_sacco_admin",
        ]


@extend_schema_serializer(
    exclude_fields=["is_sacco_admin"],
    examples=[
        OpenApiExample(
            "Example response",
            value={
                "message": "User created successfully",
            },
            response_only=True,
        ),
    ],
)
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    username = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ["email", "username", "password", "first_name", "last_name"]

    def validate(self, data):
        password = data.get("password")
        username = data.get("username")
        email = data.get("email")

        try:
            validate_password(
                password,
                user=User(
                    username=username,
                    email=email,
                ),
            )
        except serializers.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

        return data

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print("generating token")
        token["username"] = user.username
        token["email"] = user.email
        token["is_sacco_admin"] = user.is_sacco_admin
        print(token["email"])
        return token
