# Generated by Django 5.1.2 on 2024-11-08 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('sacco_admin', 'Sacco-Admin'), ('gov_admin', 'Gov-Admin'), ('sys_admin', 'Sys-Admin')], default='sacco_admin', max_length=15),
        ),
    ]