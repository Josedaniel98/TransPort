# Generated by Django 2.2.13 on 2022-06-27 04:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_movimiento'),
    ]

    operations = [
        migrations.AddField(
            model_name='movimiento',
            name='cantidad',
            field=models.IntegerField(default=0),
        ),
    ]