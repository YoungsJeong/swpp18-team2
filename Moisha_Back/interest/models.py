from datetime import datetime

from django.core.exceptions import ValidationError
from django.db import models
from article.tag import TagColor


class InterestTag(models.Model):
    name = models.CharField(max_length=20)
    color = models.ForeignKey(TagColor, on_delete=models.SET_DEFAULT, default = 2)

    def __str__(self):
        return self.name

class Interest(models.Model):
    name = models.CharField(max_length=20, unique=True)
    detail = models.CharField(max_length=300, blank=True)
    createdDate = models.DateTimeField(default = datetime.now)
    createUser = models.ForeignKey('user.User', on_delete = models.SET_DEFAULT, default=1)
    #managers = models.ManyToManyField('user.User', related_name='manage_interests')
    tags = models.ManyToManyField(InterestTag, related_name='interests')
    photoURL = models.CharField(max_length=500, default='https://raw.githubusercontent.com/swsnu/swpp18-team2/master/Images/empty.png', blank = True)

    def __str__(self):
        return self.name
#Always id of first interest is greater than the second: To Avoid Duplicate


class InterestJaccard(models.Model):
    first = models.ForeignKey(Interest, on_delete = models.CASCADE,db_index = True, related_name="score")
    second = models.ForeignKey(Interest, on_delete = models.CASCADE)
    score = models.FloatField(default=0.0, db_index = True)

    class Meta:
        unique_together = ('first', 'second')