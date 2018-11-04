from django.shortcuts import render

# Create your views here.
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializers import UserSerializer


@api_view(['POST'])
def logIn(request):
    serializer = AuthTokenSerializer(data=request.data)
    print(request.data)
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
