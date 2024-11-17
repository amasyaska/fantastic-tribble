from django.shortcuts import render


from rest_framework.decorators import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

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
                'user_data': serializer.data
                },
                status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginAPIView(GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)