# Generated by Django 5.0.4 on 2024-04-11 18:28

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
            name='PaymentDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('address_line1', models.CharField(max_length=255, verbose_name='Address Line 1')),
                ('address_line2', models.CharField(blank=True, max_length=255, verbose_name='Address Line 2')),
                ('city', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=20, verbose_name='Phone Number')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Payment Details',
            },
        ),
    ]
