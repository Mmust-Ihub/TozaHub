from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
import uuid

ROLES = [
    ("sacco_admin", "Sacco-Admin"),
    ("gov_admin", "Gov-Admin"),
    ("sys_admin", "Sys-Admin"),
]


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Username must be provided")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, username):
        user = self.create_user(email, username, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserIDField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs["max_length"] = 36
        kwargs["unique"] = True
        super().__init__(*args, **kwargs)

    def generate_user_id(self):
        return str(uuid.uuid4())


class User(AbstractBaseUser, PermissionsMixin):
    id = UserIDField(primary_key=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=150, blank=True, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    is_superuser = models.BooleanField(default=False)
    is_sacco_admin = models.BooleanField(default=False)
    role = models.CharField(
        choices=ROLES,
        max_length=15,
        default="sacco_admin",
    )
    objects = UserManager()
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username

    def generate_user_id(self):
        return str(uuid.uuid4())

    def save(self, *args, **kwargs):
        print("saveing user")
        if not self.id:
            self.id = self.generate_user_id()
        super().save(*args, **kwargs)
