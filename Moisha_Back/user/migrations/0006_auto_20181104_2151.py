# Generated by Django 2.1.1 on 2018-11-04 12:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_auto_20181104_2149'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='major',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='majorUsers', to='user.Department'),
        ),
    ]
