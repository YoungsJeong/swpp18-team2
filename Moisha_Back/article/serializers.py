from rest_framework import serializers

from article.tag import TagColorSerializer
from interest.serializers import InterestSerializer
from user.serializers import UserSerializer, UserDetailSerializer
from .models import ArticleTag, ArticleType, Article, TagColor


class ArticleTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleTag
        fields = '__all__'

    def to_representation(self, instance):
        data = super(ArticleTagSerializer, self).to_representation(instance)
        data.update({
            'color': TagColorSerializer(instance.color).data
        })
        return data


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
            'author': UserDetailSerializer(instance.author).data,
            'interest': InterestSerializer(instance.interest).data
        })
        return data