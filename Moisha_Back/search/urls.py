from django.urls import path
from search import views

urlpatterns = [
    path('department/', views.searchDepartment),
    path('interest/', views.searchInterest),
    path('interest/user/', views.searchInterestByUser),
    path('interest/tag/',views.searchInterestTag),
    path('article/tag/', views.searchArticleTag)
]
