from django.urls import path

from interest import views

urlpatterns = [
    path('<int:pk>/',views.getInterestByID),
    path('create/', views.createInterest),
    path('user/', views.getInterestsByUser),
]
