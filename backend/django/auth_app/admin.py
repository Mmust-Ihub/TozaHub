from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import User


class CustomUserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = (
        "email",
        "username",
        "is_active",
        "role",
        "is_staff",
        "is_superuser",
    )
    list_filter = (
        "is_active",
        "role",
        "is_staff",
        "is_superuser",
    )
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (
            "Permissions",
            {"fields": ("is_staff", "is_superuser", "role")},
        ),
        (
            "Personal Info",
            {"fields": ("first_name", "last_name")},
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "username",
                    "password1",
                    "password2",
                    "role",
                    "is_staff",),
            },
        ),
    )
    search_fields = ("email", "username")
    ordering = ("email",)


admin.site.register(User, CustomUserAdmin)


admin.site.site_header = "Toza Admin"
admin.site.site_title = "Toza Admin Portal"
