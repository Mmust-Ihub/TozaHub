# from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import (
    Vehicle,
    Sacco,
)
from .serializers import (
    VehicleSerializer,
    SaccoSerializer,
)


class SaccoViewSet(ModelViewSet):
    queryset = Sacco.objects.all()
    serializer_class = SaccoSerializer


class VehicleViewSet(ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
