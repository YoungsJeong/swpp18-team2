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
        return Response(serializer.data)
    print(serializer.errors)
    return Response(data=serializer.errors, status= status.HTTP_400_BAD_REQUEST)
