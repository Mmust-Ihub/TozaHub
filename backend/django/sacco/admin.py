from django.contrib import admin
from .models import (
    Vehicle,
    Sacco,
)


class SaccoAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "admin",
    ]


class VehicleAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "sacco",
        "number_plate",
        "driver",
    ]


admin.site.register(Sacco, SaccoAdmin)
admin.site.register(Vehicle, VehicleAdmin)
