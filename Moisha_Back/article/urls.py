from django.urls import path
from article import views

urlpatterns = [
    path('', views.getArticlesByUser),
    path('create/', views.createArticle),
    path('<int:pk>/comment/', views.getCommentsByArticle),
    path('interest/<int:pk>/', views.getArticlesByInterest),
]