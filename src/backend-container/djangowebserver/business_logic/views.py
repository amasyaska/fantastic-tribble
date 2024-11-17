from django.shortcuts import render

from rest_framework.decorators import APIView, permission_classes
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from rest_framework_simplejwt.tokens import AccessToken

from .serializers import CompanyCreateSerializer

class CompanyAPIView(GenericAPIView):

    serializer_class = CompanyCreateSerializer

    @permission_classes([IsAuthenticated])
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if (serializer.is_valid(raise_exception=True)):
            try:
                token = request.headers['Authorization'].split()[1]
                user_id = AccessToken(token=token)['user_id']
                assert request.data['creator_id'] == user_id
            except AssertionError:
                return Response({'message': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)

            serializer.save()
            return Response(
                {
                'message': 'Created company successfully.',
                'company_data': serializer.data
                },
                status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)