from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers

from .models import CustomUser

class CustomUserCreateSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[validate_password]
        )
    
    password2 = serializers.CharField(
        required=True,
        write_only=True,
        validators=[validate_password]
        )
    
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name', 'password', 'password2')
    
    def validate(self, attrs):
        if (attrs.get('password', '') != attrs.get('password2', '')):
            raise serializers.ValidationError('Passwords do not match.')
        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            password = validated_data['password']
        )
        return user