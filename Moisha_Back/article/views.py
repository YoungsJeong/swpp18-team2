import operator

from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from article.models import Article
from article.serializers import ArticleSerializer
from comment.serializers import CommentSerializer
from interest.models import Interest


@api_view(['GET'])
def getArticlesByUser(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    articles = Article.objects.filter(interest__in = user.interests.all()).all()
    return Response(data=ArticleSerializer(articles, many = True).data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createArticle(request):
    data = request.data
    serializer = ArticleSerializer(data=data)
    if serializer.is_valid():
        article = serializer.save()
        return Response(serializer.data)
    return Response(data=serializer.errors)


@api_view(['GET'])
def getCommentsByArticle(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    article = Article.objects.get(pk=pk)
    comments = article.comments.order_by('createdDate').all()
    return Response(data=CommentSerializer(comments, many = True).data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getArticlesByInterest(request,pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    articles = Interest.objects.get(pk=pk).articles
    return Response(data=ArticleSerializer(articles, many = True).data, status=status.HTTP_200_OK)
