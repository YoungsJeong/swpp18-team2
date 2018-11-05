from rest_framework import serializers

from interest.serializers import InterestSerializer
from user.serializers import UserSerializer
from .models import ArticleTag,ArticleType,Article

class ArticleTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleTag
        fields = '__all__'

class ArticleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleType
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    tags = ArticleTagSerializer(read_only=True, many=True)
    type = ArticleTypeSerializer(read_only=True, many=True)
    class Meta:
        model = Article
        fields = '__all__'

    def to_representation(self, instance):
        data = super(ArticleSerializer, self).to_representation(instance)
        data.update({
            'author': UserSerializer(instance.author).data['nickName'],
            'interest': InterestSerializer(instance.interest).data
        })
        return data