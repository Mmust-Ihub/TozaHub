from rest_framework import serializers
from .models import (
    Vehicle,
    Sacco,
)


class SaccoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sacco
        fields = [
            "name",
            "admin",
        ]


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
            "sacco",
            "number_plate",
            "driver",
        ]
