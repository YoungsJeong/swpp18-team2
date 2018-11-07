
from django.core.validators import RegexValidator
from django.db import models

from rest_framework import serializers


class TagColor(models.Model):
    name = models.CharField(max_length=20, unique=True)
    rgb = models.CharField(max_length=7, validators=[RegexValidator(r'^#[0-9A-F]{6}$')])
    def __str__(self):
        return self.name

class TagColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagColor
        fields = '__all__'