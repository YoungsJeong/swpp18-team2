# Generated by Django 2.1.1 on 2018-11-05 13:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0004_auto_20181105_2214'),
    ]

    operations = [
        migrations.AddField(
            model_name='articletag',
            name='rgb',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.SET_DEFAULT, to='article.TagColor'),
        ),
    ]
