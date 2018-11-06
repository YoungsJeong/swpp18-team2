from django.urls import path
from search import views

urlpatterns = [
    path('department/', views.searchDepartment),
    path('interest/', views.searchInterest)
]
