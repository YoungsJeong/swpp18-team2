from django.urls import path
from search import views

urlpatterns = [
    path('department/', views.searchDepartment),
    path('interest/', views.searchInterest),
    path('interest/tag/', views.searchInterestByTag),
    path('interest/user/', views.searchInterestByUser),
    path('interesttag/',views.searchInterestTag),
    path('articletag/', views.searchArticleTag)
]
