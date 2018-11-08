from django.urls import path

from comment import views

urlpatterns = [
    path('', views.createComment),
    path('<int:pk>/', views.editComment),
]