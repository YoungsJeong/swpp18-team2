from datetime import datetime
from django.db import models
from article.tag import TagColor


class InterestTag(models.Model):
    name = models.CharField(max_length=20)
    color = models.ForeignKey(TagColor, on_delete=models.SET_DEFAULT, default = 2)
    def __str__(self):
        return self.name

class Interest(models.Model):
    name = models.CharField(max_length=20, unique=True)
    createdDate = models.DateTimeField(default = datetime.now)
    createUser = models.ForeignKey('user.User', on_delete = models.SET_DEFAULT, default=1)
    tags = models.ManyToManyField(InterestTag, related_name='interests')
    photoURL = models.CharField(max_length=140, default='https://raw.githubusercontent.com/swsnu/swpp18-team2/master/Images/empty.png')
    def __str__(self):
        return self.name


