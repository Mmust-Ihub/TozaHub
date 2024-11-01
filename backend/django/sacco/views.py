from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
import requests
from rest_framework import status
from decouple import config
from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    OpenApiExample,
)
from .models import (
    Vehicle,
    Sacco,
)
from .serializers import (
    VehicleSerializer,
    SaccoSerializer,
)


# function to check valid phone number
def is_valid_phone_number(phone_number):
    if not phone_number.startswith("254"):
        return False
    if len(phone_number) != 12:
        return False
    return True


class SaccoViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Sacco.objects.all()
    serializer_class = SaccoSerializer

    def create(self, request, *args, **kwargs):
        user = request.user
        url = config("WALLET_URL")
        if "phone" not in request.data:
            return Response(
                {"error": "Phone number is required"},
                status=400,
            )
        if not is_valid_phone_number(request.data["phone"]):
            return Response(
                {"error": "Invalid phone number"},
                status=400,
            )
        user_sacco = Sacco.objects.filter(admin=user)
        if user_sacco:
            return Response(
                {
                    "error": "You can't create more than one sacco",
                },
                status=status.HTTP_406_NOT_ACCEPTABLE
            )
        if user.is_sacco_admin:
            request.data["admin"] = user.id
            wallet_data = {
                "phone_number": request.data["phone"],
                "email": request.data["email"],
                "name": request.data["name"]
            }
            response = requests.post(url, data=wallet_data)
            if response.status_code == 202:
                return super().create(request, *args, **kwargs)
            return Response(
                {
                    "error": "Failed to create sacco wallet",
                },
                status=400,
            )

        return Response(
            {"error": "You are not authorized to create a sacco"},
            status=403,
        )

    def list(self, request, *args, **kwargs):
        user = request.user
        if user.is_sacco_admin:
            self.queryset = Sacco.objects.filter(admin=user)
        return super().list(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        user = request.user
        if user.is_sacco_admin:
            return super().update(request, *args, **kwargs)

        return Response(
            {"error": "You are not authorized to update a sacco"},
            status=403,
        )


class VehicleViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

    def list(self, request, *args, **kwargs):
        user = request.user
        if user.is_sacco_admin:
            sacco = Sacco.objects.get(admin=user)
            self.queryset = Vehicle.objects.filter(sacco=sacco)
        return super().list(request, *args, **kwargs)

    # retrieve a vehicle base on its number plate
    @extend_schema(
        summary="Get vehicle by number plate",
        description="The number plate is placed as the id.",
        parameters=[
            OpenApiParameter(
                name="id",
                type=str,
                location=OpenApiParameter.PATH,
                description="The number plate of the vehicle",
                required=True,
            ),
        ],
        examples=[
            OpenApiExample(
                "Get Response Example",
                value={
                    "sacco": "Sacco 2",
                    "number_plate": "KBH124H",
                    "driver": "Jose",
                },
                response_only=True,
            ),
        ],
    )
    def retrieve(self, request, *args, **kwargs):
        try:
            vehicle = Vehicle.objects.get(number_plate=kwargs["pk"])
            serializer = VehicleSerializer(vehicle)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Vehicle.DoesNotExist:
            return Response(
                {"error": "Vehicle not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @extend_schema(
        summary="Create a vehicle",
        description="Create a vehicle for the user sacco.",
        examples=[
            OpenApiExample(
                "Create Response Example",
                value={
                    "number_plate": "KBH124H",
                    "driver": "Jose",
                },
                response_only=True,
            ),
        ],
    )
    def create(self, request, *args, **kwargs):
        user = request.user
        if user.is_sacco_admin:
            sacco = Sacco.objects.get(admin=user)
            request.data["sacco"] = sacco.id
            return super().create(request, *args, **kwargs)

        return Response(
            {"error": "You are not authorized to create a vehicle"},
            status=403,
        )
