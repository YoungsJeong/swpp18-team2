# Generated by Django 2.1.1 on 2018-11-06 10:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='createdDate',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]
