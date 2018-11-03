from rest_framework import serializers

from interest.serializers import InterestSerializer
from user.models import User, College, Department


class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all_'

    def to_representation(self, instance):
        data = super(DepartmentSerializer, self).to_representation(instance)
        data.update({
            'college': {
                CollegeSerializer(instance.college).data['name']
            },
        })
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'is_superuser', 'is_active', 'is_staff', 'last_login', 'groups', 'user_permissions']

    def to_representation(self, instance):
        data = super(UserDetailSerializer, self).to_representation(instance)
        data.update({
            'major': DepartmentSerializer(instance.major).data,
            'minor': DepartmentSerializer(instance.minor).data,\
            "interests": InterestSerializer(list(instance.interests.all()), many=True).data,
        })
        return data