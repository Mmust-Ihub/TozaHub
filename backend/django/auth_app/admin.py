from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "email",
        "username",
        "first_name",
        "last_name",
        "is_sacco_admin","role",
    ]


admin.site.site_header = "Toza Admin"
admin.site.site_title = "Toza Admin Portal"
admin.site.register(User, UserAdmin)
