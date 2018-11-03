from rest_framework import serializers

from interest.serializers import InterestSerializer
from user.serializers import UserSerializer
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
    def to_representation(self, instance):
        data = super(CommentSerializer, self).to_representation(instance)
        data.update('replies : {}')
        data.update({
            'author': UserSerializer(instance.author).data['nickName'],
            'interest': InterestSerializer(instance.interest).data['name'],
            'replies': {
                CommentSerializer(list(instance.replies.all()),many=True).data
            },
        })
        return data