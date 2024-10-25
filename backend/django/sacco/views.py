from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import (
    Vehicle,
    Sacco,
)
from .serializers import (
    VehicleSerializer,
    SaccoSerializer,
)


class SaccoViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Sacco.objects.all()
    serializer_class = SaccoSerializer

    def create(self, request, *args, **kwargs):
        user = request.user
        if user.is_sacco_admin:
            request.data["admin"] = user.id
            return super().create(request, *args, **kwargs)

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
            print("Sacco", sacco)
            self.queryset = Vehicle.objects.filter(sacco=sacco)
        return super().list(request, *args, **kwargs)
