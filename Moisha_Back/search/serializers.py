from rest_framework import serializers
from user.models import Department


class DepartmentSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name']