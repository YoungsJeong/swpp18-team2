import operator

from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from article.models import Article, ArticleTag
from article.serializers import ArticleSerializer, ArticleTagSerializer
from comment.serializers import CommentSerializer
from interest.models import Interest


@api_view(['GET'])
def getArticlesByUser(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    limit = request.GET.get('limit', 0)
    limit = int(limit)
    page = request.GET.get('page', 0)
    page = int(page)
    if limit > 0:
        articles = Article.objects.filter(interest__in=user.interests.all()).order_by('-createdDate')[page:page + limit]
    else:
        articles = Article.objects.filter(interest__in = user.interests.all()).order_by('-createdDate').all()
    return Response(data=ArticleSerializer(articles, many = True).data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getArticlesByUserByTag(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    limit = request.GET.get('limit', 0)
    limit = int(limit)
    page = request.GET.get('page', 0)
    page = int(page)
    articleTags = request.GET.get('tags','')
    if articleTags != '':
        articleTags = articleTags.split(',')
        articleTags = [int(id) for id in articleTags]
    else:
        articleTags = []
    if len(articleTags) != 0:
        if limit > 0:
            articles = Article.objects.filter(interest__in=user.interests.all()).filter(tags__in=articleTags).order_by('-createdDate')[page:page + limit]
        else:
            articles = Article.objects.filter(interest__in = user.interests.all()).filter(tags__in=articleTags).order_by('-createdDate').all()
        return Response(data=ArticleSerializer(articles, many = True).data, status=status.HTTP_200_OK)
    return Response('NO Articles', status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def createArticle(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    data = request.data
    interests = list(data['interest'])
    for interest in interests:
        articleData = data
        articleData['interest'] = interest
        serializer = ArticleSerializer(data=articleData)
        if serializer.is_valid():
            article = serializer.save()
            article.tags.add(*data['articleTags'])
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=200)

@api_view(['PUT'])
def editArticle(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    article = Article.objects.filter(pk = pk)
    if article.count() != 0:
        article = article[0]
        if article.author != user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        article.title = request.data['title']
        article.content = request.data['content']
        articleTags = request.data['articleTags']
        article.tags.add(*articleTags)
        article.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def getArticleTags(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    articleTags = ArticleTag.objects.all()
    return Response(data=ArticleTagSerializer(articleTags, many = True).data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getCommentsByArticle(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    article = Article.objects.filter(pk=pk)
    if article.count() == 0:
        return Response('Article does not exist', status=status.HTTP_404_NOT_FOUND)
    article = article[0]
    comments = article.comments.order_by('createdDate').all()
    return Response(data=CommentSerializer(comments, many = True).data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getArticleById(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    article = Article.objects.filter(pk=pk)
    if article.count() == 0:
        return Response('Article does not exist', status=status.HTTP_404_NOT_FOUND)
    article = article[0]
    return Response(data=ArticleSerializer(article).data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def deleteArticle(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    article = Article.objects.filter(pk=pk)
    if article.count() == 0:
        return Response('Article does not exist', status=status.HTTP_404_NOT_FOUND)
    article = article[0]
    if article.author != user:
        return Response(status = status.HTTP_401_UNAUTHORIZED)
    article.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def getArticlesByInterest(request, pk):
    limit = request.GET.get('limit', 0)
    limit = int(limit)
    page = request.GET.get('page', 0)
    page = int(page)
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    if limit > 0:
        articles = Article.objects.filter(interest=pk).order_by('-createdDate')[page:page+limit]
    else:
        articles = Article.objects.filter(interest=pk).order_by('-createdDate').all()
    return Response(data=ArticleSerializer(articles, many = True).data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getArticlesByInterestByTag(request, pk):
    limit = request.GET.get('limit', 0)
    limit = int(limit)
    page = request.GET.get('page', 0)
    page = int(page)
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    articleTags = request.GET.get('tags', '')
    if articleTags != '':
        articleTags = articleTags.split(',')
        articleTags = [int(id) for id in articleTags]
    else:
        articleTags =[]
    if len(articleTags) != 0:
        if limit > 0:
            articles = Article.objects.filter(interest=pk).filter(tags__in=articleTags).order_by('-createdDate')[page:page + limit]
        else:
            articles = Article.objects.filter(interest=pk).filter(tags__in=articleTags).order_by('-createdDate').all()
        return Response(data=ArticleSerializer(articles, many = True).data, status=status.HTTP_200_OK)
    return Response('NO Articles', status=status.HTTP_404_NOT_FOUND)

