from rest_framework import serializers

from .models import Company

class CompanyCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Company
        fields = ('name', 'description', 'creator')

    def create(self, validated_data):
        user = Company.objects.create(
            name = validated_data['name'],
            description = validated_data['description'],
            creator = validated_data['creator']
        )
        return user