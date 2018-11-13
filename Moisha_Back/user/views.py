from django.shortcuts import render

# Create your views here.
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status

from interest.models import Interest
from .models import User
from .serializers import UserSerializer, UserDetailSerializer


@api_view(['POST'])
def logIn(request):
    serializer = AuthTokenSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response(data={'token': token.key, 'user_name': user.name}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def signUp(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid() and 'password' in data:
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response(data={'token': token.key, 'user_name': user.name}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getUserInfo(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    return Response(data=UserDetailSerializer(user).data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getUserByInterest(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    limit = request.GET.get('limit', 0)
    limit = int(limit)
    interest = Interest.objects.filter(pk=pk)
    if interest.exists():
        interest = interest[0]
        if limit > 0:
            members = interest.members.all()[:limit]
        else:
            members = interest.members.all()
        return Response(data=UserDetailSerializer(members, many=True).data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_404_NOT_FOUND)
@api_view(['PUT'])
def updateInterestToUser(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    action = request.data['action']
    if action is '':
        return Response('Request Must Include Action', status = status.HTTP_400_BAD_REQUEST)
    interest = Interest.objects.filter(pk=pk)
    if interest.exists():
        interest = interest[0]
        if action == 'add':
            user.interests.add(interest)
            user.save()
            return Response(data=UserDetailSerializer(user).data, status=status.HTTP_200_OK)
        elif action == 'delete' and user.interests.filter(pk=pk).exists():
            user.interests.remove(interest)
            user.save()
            return Response(data=UserDetailSerializer(user).data, status=status.HTTP_200_OK)
        else:
            return Response('Unknown Action or User is not a Member', status = status.HTTP_400_BAD_REQUEST)
    return Response('No Such Interest',status=status.HTTP_404_NOT_FOUND)