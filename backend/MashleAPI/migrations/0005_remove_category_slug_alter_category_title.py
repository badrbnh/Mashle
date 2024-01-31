# Generated by Django 4.1.13 on 2024-01-30 19:08

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("MashleAPI", "0004_remove_table_user_alter_reservation_date_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="category",
            name="slug",
        ),
        migrations.AlterField(
            model_name="category",
            name="title",
            field=models.CharField(max_length=255, unique=True, verbose_name="Title"),
        ),
    ]