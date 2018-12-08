from django.urls import path
from rest_framework import status
from rest_framework.response import Response

from interest import views

from background_task import background
from interest.models import Interest, InterestJaccard

#Run every 1 hour
urlpatterns = [
    path('<int:pk>/',views.getInterestByID),
    path('create/', views.createInterest),
    path('tags/', views.getInterestTags),
    path('user/', views.getInterestsByUser),
    path('recommend/', views.getInterestRecommendation),
    path('recommend/tag/', views.getInterestRecommendationByTag),
    path('recommend/<int:pk>/', views.getInterestRecommendationByInterest),
    #path('<int:pk>/manager/', views.updateInterestManagers),
    path('batch/', views.batch),
]
