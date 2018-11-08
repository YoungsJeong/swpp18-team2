from django.urls import path

from interest import views

urlpatterns = [
    path('', views.createInterest),
    path('user/', views.getInterestsByUser),
]
