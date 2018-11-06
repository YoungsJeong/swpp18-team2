from django.contrib import admin
from user.models import College, Department, User


admin.site.register(College)
admin.site.register(Department)
admin.site.register(User)