from datetime import datetime
from django.db import models

# Create your models here.
class InterestTag(models.Model):
    name = models.CharField(max_length=20)

class Interest(models.Model):
    name = models.CharField(max_length=20, unique=True)
    createdDate = models.DateTimeField(datetime.now)
    tags = models.ManyToManyField(InterestTag, related_name='interests')
    photoURL = models.CharField(max_length=140, null=True, blank=True)