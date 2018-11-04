from django.contrib import admin

from article.models import ArticleTag,ArticleType,Article

admin.site.register(ArticleTag)
admin.site.register(ArticleType)
admin.site.register(Article)

# Register your models here.
