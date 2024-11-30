from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import User


class CustomUserCreationForm(forms.ModelForm):
    password1 = forms.CharField(
        label="Password",
        widget=forms.PasswordInput,
        required=True,
    )
    password2 = forms.CharField(
        label="Confirm Password",
        widget=forms.PasswordInput,
        required=True,
    )
    email = forms.EmailField(label="Email", required=True)

    class Meta:
        model = User
        fields = ("email", "username", "role")

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords do not match")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])  # Hash the password
        if commit:
            user.save()
        return user


class CustomUserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = (
            "email",
            "username",
            "password",
            "is_active",
            "role",
            "is_staff",
            "is_superuser",
        )

    def clean_password(self):
        # Return the initial password value without modifying it
        return self.initial["password"]
