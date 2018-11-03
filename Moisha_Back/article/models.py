from datetime import datetime

from django.db import models

# Create your models here.
from interest.models import Interest
from user.models import User


class ArticleTag(models.Model):
    name = models.CharField(max_length=20, unique=True)


class ArticleType(models.Model):
    name = models.CharField(max_length=20, unique=True)


class Article(models.Model):
    title = models.CharField(max_length=80)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name= 'createdArticles')
    content = models.TextField(max_length=1400)
    createdDate = models.DateTimeField(default=datetime.now)
    interest = models.ForeignKey(Interest, on_delete=models.CASCADE, related_name='articles')
    tags = models.ManyToManyField(ArticleTag,blank = True, related_name='articles')
    type = models.ManyToManyField(ArticleType, related_name='articles')