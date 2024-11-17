from rest_framework import serializers

from .models import Company

class CompanyCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Company
        fields = ('name', 'description', 'creator_id')

    def create(self, validated_data):
        user = Company.objects.create(
            name = validated_data['name'],
            description = validated_data['description'],
            creator_id = validated_data['creator_id']
        )
        return user