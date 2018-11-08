from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from interest.serializers import InterestSerializer


@api_view(['POST'])
def createInterest(request):
    data = request.data
    if data['photoURL'] == '':
        data['photoURL'] = 'https://raw.githubusercontent.com/swsnu/swpp18-team2/master/Images/empty.png'
    serializer = InterestSerializer(data=data)
    if serializer.is_valid():
        interest = serializer.save()
        interest.tags.add(*data['tags'])
        return Response(serializer.data)
    return Response(data=serializer.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getInterestsByUser(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    return Response(data=InterestSerializer(user.interests, many=True).data, status=status.HTTP_200_OK)