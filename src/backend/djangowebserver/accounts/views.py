from django.shortcuts import render


from rest_framework.decorators import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import CustomUserCreateSerializer

class UserAPIView(GenericAPIView):

    serializer_class = CustomUserCreateSerializer

    def post(self, request):
        serializer = self.serializer_class(request.data)
        
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(
                {
                'message': 'created user successfully',
                'user_data': serializer.data
                },
                status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)