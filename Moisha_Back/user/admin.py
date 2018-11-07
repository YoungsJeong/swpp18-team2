from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from user.models import College, Department, User


class UserInline(admin.TabularInline):
    model = User.interests.through


class UserAdmin(admin.ModelAdmin):
    inlines = [
        UserInline,
    ]
    exclude = ('interests',)

admin.site.register(College)
admin.site.register(Department)
admin.site.register(User,UserAdmin)