from rest_framework import serializers

from article.serializers import ArticleSerializer
from interest.serializers import InterestSerializer
from user.serializers import UserSerializer
from .models import Comment



class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'createdDate']

    def to_representation(self, instance):
        data = super(ReplySerializer, self).to_representation(instance)
        data.update({
            'author': UserSerializer(instance.author).data['nickName']
        })
        return data


class CommentSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(read_only=True, many=True)
    class Meta:
        model = Comment
        fields = '__all__'
    def to_representation(self, instance):
        data = super(CommentSerializer, self).to_representation(instance)
        '''
        replies = instance.replies.values()
        if len(replies) == 0:
            data.update({
                'replies': []
            })
        '''
        data.update({
            'author': UserSerializer(instance.author).data['nickName']
        })
        return data