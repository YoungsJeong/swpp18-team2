from django.shortcuts import render

# Create your views here.
from haystack.query import SearchQuerySet
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from article.models import ArticleTag
from interest.models import Interest, InterestTag
from search.serializers import DepartmentSearchSerializer, InterestSearchSerializer, ArticleTagSearchSerializer, \
    InterestTagSearchSerializer
from user.models import Department


@api_view(['GET'])
def searchDepartment(request):
    q = request.GET.get('q', '')
    if q is '':
        return Response(data=[], status=status.HTTP_200_OK)
    sqs = SearchQuerySet().models(Department).filter(name__contains=q)
    if len(sqs) == 0:
        sqs = SearchQuerySet().models(Department).autocomplete(autocomplete_search=q)
    serializer_list = []
    for sqs_element in sqs:
        department = Department.objects.get(id=sqs_element.object.id)
        serializer_list.append(department)
    serializer = DepartmentSearchSerializer(serializer_list, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def searchArticleTag(request):
    q = request.GET.get('q', '')
    if q is '':
        return Response(data=[], status=status.HTTP_200_OK)
    sqs = SearchQuerySet().models(ArticleTag).filter(name__contains=q)
    if len(sqs) == 0:
        sqs = SearchQuerySet().models(ArticleTag).autocomplete(autocomplete_search=q)
    serializer_list = []
    for sqs_element in sqs:
        articleTag = ArticleTag.objects.get(id=sqs_element.object.id)
        serializer_list.append(articleTag)
    serializer = ArticleTagSearchSerializer(serializer_list, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def searchInterestTag(request):
    q = request.GET.get('q', '')
    if q is '':
        return Response(data=[], status=status.HTTP_200_OK)
    sqs = SearchQuerySet().models(InterestTag).filter(name__contains=q)
    if len(sqs) == 0:
        sqs = SearchQuerySet().models(InterestTag).autocomplete(autocomplete_search=q)
    serializer_list = []
    for sqs_element in sqs:
        interestTag = InterestTag.objects.get(id=sqs_element.object.id)
        serializer_list.append(interestTag)
    serializer = InterestTagSearchSerializer(serializer_list, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def searchInterest(request):
    q = request.GET.get('q', '')
    if q is '':
        return Response(data=[], status=status.HTTP_200_OK)
    sqs = SearchQuerySet().models(Interest).filter(name__contains=q)
    if len(sqs) == 0:
        sqs = SearchQuerySet().models(Interest).autocomplete(autocomplete_search=q)
    serializer_list = []
    for sqs_element in sqs:
        interest = Interest.objects.get(id=sqs_element.object.id)
        serializer_list.append(interest)
    serializer = InterestSearchSerializer(serializer_list, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)