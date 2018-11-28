from datetime import datetime

from django.core.validators import RegexValidator
from django.db import models

# Create your models here.
from django.db.models import SET_DEFAULT

from article.tag import TagColor
from interest.models import Interest
from user.models import User

#TagColor(id=2) is danger-color-dark #CC0000
class ArticleTag(models.Model):
    name = models.CharField(max_length=20, unique=True)
    color = models.ForeignKey(TagColor, on_delete = SET_DEFAULT, default = 2)
    def __str__(self):
        return self.name

class ArticleType(models.Model):
    name = models.CharField(max_length=20, unique=True)
    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=80)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name= 'createdArticles')
    content = models.TextField(max_length=1400)
    createdDate = models.DateTimeField(default=datetime.now, db_index=True)
    interest = models.ForeignKey(Interest, on_delete=models.CASCADE, related_name='articles', db_index=True)
    tags = models.ManyToManyField(ArticleTag,blank = True, related_name='articles')
    type = models.ManyToManyField(ArticleType, related_name='articles')