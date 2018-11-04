from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.db import models

# Create your models here.
from interest.models import Interest
from user.manager import UserManager


class College(models.Model):
    name = models.CharField(blank=False, null=False, max_length=128)

    def __str__(self):
        return self.name


class Department(models.Model):
    name = models.CharField(blank=False, null=False, max_length=128)
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='departments')

    def __str__(self):
        return self.name


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=20)
    studentId = models.IntegerField(unique=True)
    major = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='majorUsers')
    nickName = models.CharField(max_length=20, unique=True)
    interests = models.ManyToManyField(Interest,blank=True, related_name='members')
    USERNAME_FIELD = 'email'
    objects = UserManager()
    is_staff = models.BooleanField(
        'staff status',
        default=False,
        help_text='Designates whether the user can log into this site.',
    )
    is_active = models.BooleanField(
        'active',
        default=True,
        help_text=
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ,
    )
