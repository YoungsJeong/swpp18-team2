from django.urls import path

from interest import views

urlpatterns = [
    path('create/', views.createInterest),
    path('user/', views.getInterestsByUser),
]
