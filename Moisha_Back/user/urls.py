from django.urls import path
from user import views

urlpatterns = [
    path('signup/', views.signUp),
    path('login/', views.logIn),
    path('info/', views.getUserInfo),
    path('interest/<int:pk>/', views.getUserByInterest),
]