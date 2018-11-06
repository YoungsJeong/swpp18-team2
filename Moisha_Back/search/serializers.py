from rest_framework import serializers

from article.models import ArticleTag
from article.tag import TagColorSerializer
from interest.models import Interest, InterestTag
from interest.serializers import InterestTagSerializer
from user.models import Department, User


class DepartmentSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name']


class ArticleTagSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleTag
        fields = '__all__'

    def to_representation(self, instance):
        data = super(ArticleTagSearchSerializer, self).to_representation(instance)
        data.update({
            'color': TagColorSerializer(instance.color).data
        })

        return data


class InterestTagSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestTag
        fields = '__all__'

    def to_representation(self, instance):
        data = super(InterestTagSearchSerializer, self).to_representation(instance)
        data.update({
            'color': TagColorSerializer(instance.color).data
        })
        return data


class InterestSearchSerializer(serializers.ModelSerializer):
    tags = InterestTagSerializer(read_only=True, many=True)

    class Meta:
        model = Interest
        fields = '__all__'

    def to_representation(self, instance):
        data = super(InterestSearchSerializer, self).to_representation(instance)
        data.update({
            'createUser': User.objects.get(id=instance.createUser.id).nickName
        })

        return data
