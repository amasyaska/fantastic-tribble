from rest_framework import serializers

from .models import Company, CompanyCustomUser, Project

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
    

class CompanyMembersSerializer(serializers.ModelSerializer):

    class Meta:
        model = CompanyCustomUser
        fields = ('user', 'company')

    def create(self, validated_data):
        obj = CompanyCustomUser.objects.create(
            user = validated_data['user'],
            company = validated_data['company']
        )
        return obj
    
class ProjectCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ('name', 'description', 'company')

    def create(self, validated_data):
        obj = Project.objects.create(
            name = validated_data['name'],
            description = validated_data['description'],
            company = validated_data['company']
        )
        return obj