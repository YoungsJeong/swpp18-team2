from rest_framework import serializers
from interest.models import Interest, InterestTag


class InterestTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestTag
        fields = '__all__'


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'
    def to_representation(self, instance):
        data = super(InterestSerializer, self).to_representation(instance)
        data.update({
            'tags': {
                InterestTagSerializer(list(instance.tags.all()), many=True).data
            },
        })
        return data