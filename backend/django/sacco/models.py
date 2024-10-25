from django.db import models
from django.conf import settings


class Sacco(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True,)
    admin = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sacco_admin",
    )

    def __str__(self):
        return self.name


class Vehicle(models.Model):
    sacco = models.ForeignKey(Sacco, on_delete=models.CASCADE)
    number_plate = models.CharField(max_length=150)
    driver = models.CharField(max_length=150)

    def __str__(self):
        return self.number_plate
