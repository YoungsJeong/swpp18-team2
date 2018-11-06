from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from article.models import Article
from article.serializers import ArticleSerializer


@api_view(['GET'])
def getArticles(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    articles = Article.objects.filter(interest__in = user.interests.all()).all()
    return Response(data=ArticleSerializer(articles, many = True).data, status=status.HTTP_200_OK)
