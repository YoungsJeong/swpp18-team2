from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from article.models import Article
from comment.models import Comment
from comment.serializers import CommentSerializer, CommentCreateSerializer


@api_view(['POST'])
def createComment(request):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    data = request.data
    serializer = CommentCreateSerializer(data=data)
    if serializer.is_valid():
        comment = serializer.save()
        return Response(serializer.data)
    return Response(data=serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def editComment(request, pk):
    user = request.user
    if user.is_anonymous:
        return Response('Anonymous user is not allowed', status=status.HTTP_400_BAD_REQUEST)
    data = request.data
    comment = Comment.objects.get(id=pk)
    if comment.comment is not None:
        parent = comment.comment
    else:
        parent = comment
    if user == comment.author:
        if request.method == 'PUT':
            comment.content = data['content']
            comment.save()
        elif request.method == 'DELETE':
            if not parent.replies.exists():
                comment.delete()
            else:
                comment.content = '삭제된 댓글 입니다.'
                comment.deleted = True
                comment.save()
        return Response(status = status.HTTP_200_OK)
    return Response('Only writer can edit/delete comments', status=status.HTTP_400_BAD_REQUEST)