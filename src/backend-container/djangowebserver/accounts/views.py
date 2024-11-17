from django.shortcuts import render


from rest_framework.decorators import APIView, permission_classes
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from rest_framework_simplejwt.tokens import AccessToken

from .serializers import CustomUserCreateSerializer, LoginSerializer
from .models import CustomUser

class UserAPIView(GenericAPIView):

    serializer_class = CustomUserCreateSerializer

    def get(self, request, id):
        try:
            user = CustomUser.objects.get(pk=id)
        except:
            return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(
            {
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
            },
            status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(
                {
                'message': 'Created user successfully.',
                'user_id': CustomUser.objects.get(username=serializer.data['username']).id,
                'user_data': serializer.data
                },
                status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @permission_classes([IsAuthenticated])
    def delete(self, request, id):
        try:
            token = request.headers['Authorization'].split()[1]
            user_id = AccessToken(token=token)['user_id']
            assert user_id == id
        except:
            return Response({'message': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            user = CustomUser.objects.get(pk=id)
        except:
            return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        username = user.username
        email = user.email
        first_name = user.first_name
        last_name = user.last_name
        user.delete()
        return Response(
            {
                'message': f'User with id {id} (username: {username}, email: {email}, first_name: {first_name}, last_name: {last_name}) has been successfully deleted.',
            },
            status=status.HTTP_200_OK)
    

class LoginAPIView(GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(
            {
                'user_id': CustomUser.objects.get(username=request.data['username']).id,
                'data': serializer.data,
            },
            status=status.HTTP_200_OK)