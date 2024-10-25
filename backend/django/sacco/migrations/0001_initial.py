# Generated by Django 5.1.2 on 2024-10-24 13:09

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Sacco',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('admin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sacco_admin', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number_plate', models.CharField(max_length=150)),
                ('driver', models.CharField(max_length=150)),
                ('sacco', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sacco.sacco')),
            ],
        ),
    ]
