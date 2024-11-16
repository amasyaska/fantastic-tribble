from django.shortcuts import render


from rest_framework.decorators import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import CustomUserCreateSerializer, LoginSerializer

class UserAPIView(GenericAPIView):

    serializer_class = CustomUserCreateSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(
                {
                'message': 'created user successfully',
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