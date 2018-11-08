from django.urls import path
from article import views

urlpatterns = [
    path('', views.getArticles),
    path('', views.createArticle),
    path('<int:pk>/comment/', views.getCommentsByArticle),
]
