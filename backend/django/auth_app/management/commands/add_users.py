# commands to create users refer to ../../models.py
from django.core.management.base import BaseCommand
from auth_app.models import User

# 0712892595
PASSWORD = "CustomPass@1"

USERS = [
    {
        "email": "saccoadmin@gmail.com",
        "username": "saccoadmin",
        "role": "sacco_admin",
    },
    {
        "email": "govadmin@gmail.com",
        "username": "govadmin",
        "role": "gov_admin",
    },
    {
        "email": "siteadmin@site.com",
        "username": "sysadmin",
        "role": "sys_admin",
    },
]


class Command(BaseCommand):
    help = "Create users"

    def handle(self, *args, **kwargs):
        for user in USERS:
            try:
                User.objects.create_superuser(
                    email=user["email"],
                    password=PASSWORD,
                    username=user["username"],
                )
                self.stdout.write(
                    self.style.SUCCESS(
                        f"User {user['username']} created successfully",
                    ),
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(
                        f"Error creating user {user['username']}: {e}",
                    ),
                )
                continue
        self.stdout.write(self.style.SUCCESS("Users created successfully"))
