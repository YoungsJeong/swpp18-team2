from rest_framework import serializers

from interest.models import Interest
from interest.serializers import InterestTagSerializer
from user.models import Department, User


class DepartmentSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name']


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
