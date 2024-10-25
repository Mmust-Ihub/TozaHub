from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register("sacco", views.SaccoViewSet, basename="sacco")
router.register("vehicle", views.VehicleViewSet, basename="vehicle")

urlpatterns = router.urls
