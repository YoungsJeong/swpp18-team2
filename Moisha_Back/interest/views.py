from operator import itemgetter

from background_task import background
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from interest.models import Interest, InterestJaccard, InterestTag
from interest.serializers import InterestSerializer, InterestTagSerializer, InterestSimpleSerializer


def jaccardScore(firstSet, secondSet):
    intersectionSet = firstSet.intersection(secondSet)
    return float(len(intersectionSet)) / (len(firstSet) + len(secondSet) - len(intersectionSet))

@api_view(['GET'])

def batch(request):
    RecommendationAll()
    return Response('finished', status=status.HTTP_200_OK)


def RecommendationAll():
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
    return Response('finished', status=status.HTTP_200_OK)

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
    return Response('finished', status=status.HTTP_200_OK)

@api_view(['GET'])
def getInterestTags(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    interestTags = InterestTag.objects.all()
    return Response(data=InterestTagSerializer(interestTags, many = True).data, status=status.HTTP_200_OK)


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
    interests = user.interests.all()
    recommend = InterestJaccard.objects.filter(first__in=interests).exclude(second__in=interests).order_by('-score').all()
    interests = set([])
    for recommendItem in recommend:
        if recommendItem.second not in interests:
            interests.add(recommendItem.second)
    return Response(data=InterestSerializer(interests, many=True).data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getInterestRecommendationByTag(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    interests = user.interests.all()
    interestTags = request.GET.get('tags', '')
    if interestTags != '':
        interestTags = interestTags.split(',')
        interestTags = [int(id) for id in interestTags]
    else:
        interestTags = []
    recommend = InterestJaccard.objects.filter(first__in=interests).filter(second__tags__in=interestTags).exclude(second__in=interests).order_by('-score').all()
    interests = set([])
    for recommendItem in recommend:
        if recommendItem.second not in interests:
            interests.add(recommendItem.second)
    return Response(data=InterestSerializer(interests, many=True).data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getInterestRecommendationByInterest(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    interests = user.interests.all()
    interest = Interest.objects.filter(pk=pk)
    if interest.count() == 0:
        return Response(status=status.HTTP_404_NOT_FOUND)
    interest = interest[0]
    recommend = InterestJaccard.objects.filter(first=interest).exclude(second__in=interests).order_by('-score').all()
    interests = set([])
    for recommendItem in recommend:
        if recommendItem.second not in interests:
            interests.add(recommendItem.second)
    return Response(data=InterestSerializer(interests, many=True).data, status=status.HTTP_200_OK)
'''
@api_view(['PUT'])
def updateInterestManagers(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    action = request.data['action']
    if action is '':
        return Response('Request Must Include Action', status = status.HTTP_400_BAD_REQUEST)
    userToChange = request.data['user']
    interest = Interest.objects.filter(pk=pk)
    if interest.count() != 0:
        interest = interest[0]
        managers = interest.managers.all()
        if user in managers:
            if action == 'promote' and userToChange not in managers:
                interest.managers.add(userToChange)
                interest.save()
                return Response(data=InterestSerializer(interest).data, status=status.HTTP_200_OK)
            elif action == 'demote' and userToChange in managers:
                interest.managers.remove(userToChange)
                interest.save()
                return Response(data=InterestSerializer(interest).data, status=status.HTTP_200_OK)
            else:
                return Response('Unknown Action', status = status.HTTP_400_BAD_REQUEST)
        return Response('User is Not Manager', status=status.HTTP_401_UNAUTHORIZED)
    return Response('No Such Interest',status=status.HTTP_404_NOT_FOUND)
    '''
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
        #interest.managers.add(user)
        #interest.save()
        user.interests.add(interest)
        user.save()
        return Response(serializer.data)
    return Response(data=serializer.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getInterestsByUser(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    return Response(data=InterestSimpleSerializer(user.interests, many=True).data, status=status.HTTP_200_OK)