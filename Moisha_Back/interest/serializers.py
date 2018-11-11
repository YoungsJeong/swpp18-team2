from rest_framework import serializers

from article.tag import TagColorSerializer
from interest.models import Interest, InterestTag


class InterestTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestTag
        fields = '__all__'
    def to_representation(self, instance):
        data = super(InterestTagSerializer, self).to_representation(instance)
        data.update({
            'color': TagColorSerializer(instance.color).data
        })

        return data

class InterestSerializer(serializers.ModelSerializer):
    tags = InterestTagSerializer(read_only=True, many=True)

    class Meta:
        model = Interest
        fields = '__all__'

    def to_representation(self, instance):
        data = super(InterestSerializer, self).to_representation(instance)
        data.update({
            'members': instance.members.count(),
            'createUser': instance.createUser.nickName
        })
        return data