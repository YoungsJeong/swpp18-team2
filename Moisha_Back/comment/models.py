from datetime import datetime

from django.db import models

# Create your models here.
from article.models import Article
from user.models import User


class Comment(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name="comments")
    article = models.ForeignKey(Article,on_delete=models.CASCADE,related_name='comments')
    comment = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replies', blank=True, null=True)
    content = models.TextField(max_length=1400)
    createdDate = models.DateTimeField(default=datetime.now)