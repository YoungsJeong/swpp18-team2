from django.urls import path
from user import views

urlpatterns = [
    path('signup/', views.signUp),
    path('login/', views.logIn),
    path('check/', views.checkDuplicate),
    path('info/', views.getUserInfo),
    path('modify/', views.modifyUserInfo),
    path('interest/<int:pk>/', views.getUserByInterest),
    path('interest/<int:pk>/update/', views.updateInterestToUser),
]