from operator import itemgetter

from background_task import background
from django.db.models import Q, F
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from interest.models import Interest, InterestJaccard
from interest.serializers import InterestSerializer


def jaccardScore(firstSet, secondSet):
    intersectionSet = firstSet.intersection(secondSet)
    return float(len(intersectionSet)) / (len(firstSet) + len(secondSet) - len(intersectionSet))
def batch(request):
    batchRecommendationAll()
    return Response(status=status.HTTP_200_OK)

@background(schedule = 3)
def batchRecommendationAll():
    interests = Interest.objects.all()
    for firstInterest in interests:
        for secondInterest in interests:
            if firstInterest.id != secondInterest.id:
                score = jaccardScore(firstInterest.members.values('id').all(), secondInterest.members.values('id').all())
                interestJaccard = InterestJaccard.objects.filter(first = firstInterest, second = secondInterest)
                if interestJaccard.count() == 0:
                    interestJaccard = InterestJaccard(first = firstInterest, second = secondInterest)
                else:
                    interestJaccard = interestJaccard[0]
                interestJaccard.score = score
                interestJaccard.save()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def getInterestByID(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    create = request.GET.get('create', '')
    if create is not '' and not user.interests.filter(pk=pk).exists():
        return Response('Only Subscribed User can write', status=status.HTTP_400_BAD_REQUEST)
    interest = Interest.objects.filter(pk=pk)
    if interest.exists():
        return Response(data=InterestSerializer(interest[0]).data, status=status.HTTP_200_OK)
    return Response('No Interest is Found.',status=status.HTTP_404_NOT_FOUND)
@api_view(['GET'])
def getInterestRecommendation(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    limit = request.GET.get('limit', 10)
    limit = int(limit)
    page = request.GET.get('page', 0)
    page = int(page)
    interests = user.interests.all()
    recommend = InterestJaccard.objects.filter(first__in=interests).exclude(second__in=interests).order_by('-score')[page:page+limit].values_list('second')
    interests = Interest.objects.filter(id__in=recommend).all()
    return Response(data=InterestSerializer(interests, many=True).data, status=status.HTTP_200_OK)
@api_view(['POST'])
def createInterest(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    data = request.data
    if data['photoURL'] == '':
        data['photoURL'] = 'https://raw.githubusercontent.com/swsnu/swpp18-team2/master/Images/empty.png'
    serializer = InterestSerializer(data=data)
    if serializer.is_valid():
        interest = serializer.save()
        interest.tags.add(*data['interestTags'])
        user.interests.add(interest)
        user.save()
        return Response(serializer.data)
    return Response(data=serializer.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getInterestsByUser(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    return Response(data=InterestSerializer(user.interests, many=True).data, status=status.HTTP_200_OK)