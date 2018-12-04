from django.contrib import admin
from interest.models import InterestTag, Interest, InterestJaccard

admin.site.register(InterestTag)
admin.site.register(Interest)
admin.site.register(InterestJaccard)
