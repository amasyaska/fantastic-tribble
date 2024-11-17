from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

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
    

class LoginSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(
        max_length=255
        )
    
    password = serializers.CharField(
        write_only=True
        )
    
    access_token = serializers.CharField(
        max_length=255,
        read_only=True
    )

    refresh_token = serializers.CharField(
        max_length=255,
        read_only=True
    )

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'access_token', 'refresh_token')

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        request = self.context.get('request')

        user = authenticate(request=request, username=username, password=password)
        if (not user):
            raise AuthenticationFailed('Invalid credentials.')
        
        tokens = user.get_jwt_tokens_for_user()

        return {
            'username': user.username,
            'access_token': tokens.get('access_token'),
            'refresh_token': tokens.get('refresh_token')
        }