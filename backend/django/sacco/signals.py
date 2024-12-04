from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Sacco
import requests
from decouple import config


@receiver(pre_save, sender=Sacco)
def create_wallet(sender, instance, **kwargs):
    wallet_url = config("WALLET_URL")
    if instance._state.adding:
        wallet_data = {
            "phone_number": instance.phone,
            "email": instance.email,
            "name": instance.name,
        }
        try:
            response = requests.post(wallet_url, data=wallet_data, timeout=10)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Failed to create wallet: {e}")
            instance.wallet_creation_failed = True

        if response.status_code == 202:
            # instance.save()
            instance.has_wallet = True
            print("sacco wallet created successfully")
