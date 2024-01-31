# Generated by Django 4.1.13 on 2024-01-31 02:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MashleAPI', '0005_remove_category_slug_alter_category_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='title',
            field=models.CharField(db_index=True, max_length=255, unique=True, verbose_name='Title'),
        ),
        migrations.AlterField(
            model_name='menuitems',
            name='title',
            field=models.CharField(db_index=True, max_length=255, unique=True, verbose_name='Title'),
        ),
    ]
