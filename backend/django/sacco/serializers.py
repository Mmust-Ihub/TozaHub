from rest_framework import serializers
from .models import (
    Vehicle,
    Sacco,
)
from auth_app.serializers import UserDetailSerializer
from auth_app.models import User


class SaccoSerializer(serializers.ModelSerializer):
    admin = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
    )

    class Meta:
        model = Sacco
        fields = [
            "name",
            "admin",
            "email",
            "phone",
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        admin_email = UserDetailSerializer(instance.admin).data["email"]
        representation["admin"] = admin_email
        return representation


class VehicleDetailSerializer(serializers.ModelSerializer):
    sacco = SaccoSerializer().fields["name"]

    class Meta:
        model = Vehicle
        fields = [
            "sacco",
            "number_plate",
            "driver","pk",
        ]


class VehicleRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
            "sacco",
            "number_plate",
            "driver",
        ]
