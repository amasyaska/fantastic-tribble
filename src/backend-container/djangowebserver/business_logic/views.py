from django.shortcuts import render

from rest_framework.decorators import APIView, permission_classes
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from rest_framework_simplejwt.tokens import AccessToken

from .serializers import CompanyCreateSerializer
from .models import Company

class CompanyAPIView(GenericAPIView):

    serializer_class = CompanyCreateSerializer

    def get(self, request, id):
        try:
            company = Company.objects.get(pk=id)
        except:
            return Response({'message': 'Company not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(
            {
                'id': company.id,
                'name': company.name,
                'description': company.description,
            },
            status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if (serializer.is_valid(raise_exception=True)):
            try:
                token = request.headers['Authorization'].split()[1]
                user_id = AccessToken(token=token)['user_id']
                assert request.data['creator'] == user_id
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
    
    @permission_classes([IsAuthenticated])
    def delete(self, request, id):
        try:
            company = Company.objects.get(pk=id)
        except:
            return Response({'message': 'Company not found.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            token = request.headers['Authorization'].split()[1]
            user_id = AccessToken(token=token)['user_id']
            assert user_id == company.creator.id     # if user that invokes deletion is a creator of a company
        except AssertionError:
            return Response({'message': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        name = company.name
        description = company.description
        creator_id = company.creator.id
        company.delete()
        return Response(
            {
                'message': f'Company with id {id} (name: {name}, description: {description}, creator_id: {creator_id}) has been successfully deleted.',
            },
            status=status.HTTP_200_OK)