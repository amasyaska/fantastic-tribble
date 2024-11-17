from django.shortcuts import render

from rest_framework.decorators import APIView, permission_classes
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from rest_framework_simplejwt.tokens import AccessToken

from .serializers import CompanyCreateSerializer, CompanyMembersSerializer, ProjectCreateSerializer, TaskCreateSerializer, TaskCustomUserSerializer
from .models import Company, CompanyCustomUser, Project, Task, TaskCustomUser

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
                'company_id': Company.objects.get(name=serializer['name'].value).id,
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
    

class CompanyMembersAPIView(GenericAPIView):

    serializer_class = CompanyMembersSerializer

    def get(self, request, company_id):
        try:
            members = CompanyCustomUser.objects.filter(company=company_id)
        except:
            return Response({'message': 'Company not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(
            {
                'members': [member.user.id for member in list(members)],
            },
            status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    def post(self, request, company_id):
        serializer = self.serializer_class(data=request.data)
        
        if (serializer.is_valid(raise_exception=True)):
            try:
                token = request.headers['Authorization'].split()[1]
                user_id = AccessToken(token=token)['user_id']
                assert Company.objects.get(pk=company_id).creator.id == user_id
                assert company_id == request.data['company']
            except AssertionError:
                return Response({'message': 'Permission denied. You cannot add members to this company.'}, status=status.HTTP_403_FORBIDDEN)

            serializer.save()
            return Response(
                {
                'message': 'User added successfully.',
                'data': serializer.data
                },
                status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, company_id, member_id):
        try:
            company = Company.objects.get(pk=company_id)
        except:
            return Response({'message': 'Company not found.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            token = request.headers['Authorization'].split()[1]
            user_id = AccessToken(token=token)['user_id']
            assert user_id == company.creator.id     # if user that invokes deletion is a creator of a company
        except AssertionError:
            return Response({'message': 'Permission denied. You cannot delete members to this company.'}, status=status.HTTP_403_FORBIDDEN)
        companycustomuser = CompanyCustomUser.objects.get(company=company_id, user=member_id)
        companycustomuser.delete()
        return Response(
            {
                'message': f'Member {member_id} has been successfully deleted.',
            },
            status=status.HTTP_200_OK)
    

class ProjectAPIView(GenericAPIView):

    serializer_class = ProjectCreateSerializer

    def get(self, request, project_id):
        try:
            project = Project.objects.get(pk=project_id)
        except:
            return Response({'message': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(
            {
                'id': project.id,
                'name': project.name,
                'description': project.description,
                'company': project.company.id,
            },
            status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if (serializer.is_valid(raise_exception=True)):
            try:
                token = request.headers['Authorization'].split()[1]
                user_id = AccessToken(token=token)['user_id']
                CompanyCustomUser.objects.get(user=user_id, company=request.data['company'])
            except AssertionError:
                return Response({'message': 'Permission denied. You are not in this company.'}, status=status.HTTP_403_FORBIDDEN)

            serializer.save()
            return Response(
                {
                'message': 'Created project successfully.',
                'project_id': Project.objects.get(name=request.data['name'], company=request.data['company']).id,
                'project_data': serializer.data
                },
                status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @permission_classes([IsAuthenticated])
    def delete(self, request, project_id):
        try:
            project = Project.objects.get(pk=project_id)
        except:
            return Response({'message': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            token = request.headers['Authorization'].split()[1]
            user_id = AccessToken(token=token)['user_id']
            assert user_id == project.company.creator.id     # if user that invokes deletion is a creator of a company
        except AssertionError:
            return Response({'message': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        project.delete()
        return Response(
            {
                'message': f'Project with id {project_id} has been successfully deleted.',
            },
            status=status.HTTP_200_OK)
    

class CustomUserCompaniesAPIView(GenericAPIView):

    @permission_classes([IsAuthenticated])
    def get(self, request):
        token = request.headers['Authorization'].split()[1]
        user_id = AccessToken(token=token)['user_id']
        return Response(
            {
                'companies': [elem.company.id for elem in list(CompanyCustomUser.objects.filter(user=user_id))],
            },
            status=status.HTTP_200_OK)
    

class TaskAPIView(GenericAPIView):

    serializer_class = TaskCreateSerializer

    def get(self, request, project_id, task_id):
        try:
            project = Project.objects.get(pk=project_id)
        except:
            return Response({'message': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            task = Task.objects.get(pk=task_id)
        except:
            return Response({'message': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            token = request.headers['Authorization'].split()[1]
            user_id = AccessToken(token=token)['user_id']
            # if user in this project
        except AssertionError:
            return Response({'message': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        return Response(
            {
                'id': task.id,
                'name': task.name,
                'description': task.description,
                'project': task.project.id,
            },
            status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    def post(self, request, project_id):
        serializer = self.serializer_class(data=request.data, context = {'project_id': project_id})
        
        if (serializer.is_valid(raise_exception=True)):
            try:
                token = request.headers['Authorization'].split()[1]
                user_id = AccessToken(token=token)['user_id']
                assert Project.objects.get(pk=project_id).id # user in project
            except AssertionError:
                return Response({'message': 'Permission denied. You cannot add tasks to this project.'}, status=status.HTTP_403_FORBIDDEN)

            serializer.save()
            return Response(
                {
                'message': 'Task added successfully.',
                'data': serializer.data
                },
                status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    def delete(self, request, project_id, task_id):
        try:
            project = Project.objects.get(pk=project_id)
        except:
            return Response({'message': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            task = Task.objects.get(pk=task_id)
        except:
            return Response({'message': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            token = request.headers['Authorization'].split()[1]
            user_id = AccessToken(token=token)['user_id']
            # assert user_id == project.company.creator.id     # if user that invokes deletion is a creator of a company
        except AssertionError:
            return Response({'message': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
        task.delete()
        return Response(
            {
                'message': f'Task with id {task_id} from project with id {project_id} has been successfully deleted.',
            },
            status=status.HTTP_200_OK)
    

class TaskCustomUserAPIView(GenericAPIView):
    serializer_class = TaskCustomUserSerializer

    def get(self, request, project_id, task_id):
        try:
            workers = TaskCustomUser.objects.filter(task=task_id)
        except:
            return Response({'message': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(
            {
                'workers': [worker.user.id for worker in list(workers)],
            },
            status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    def post(self, request, project_id, task_id):
        serializer = self.serializer_class(data=request.data)
        
        if (serializer.is_valid(raise_exception=True)):
            try:
                token = request.headers['Authorization'].split()[1]
                user_id = AccessToken(token=token)['user_id']
                # check if user belongs to project
            except AssertionError:
                return Response({'message': 'Permission denied. You cannot add users to this task.'}, status=status.HTTP_403_FORBIDDEN)

            serializer.save()
            return Response(
                {
                'message': 'User added successfully.',
                'data': serializer.data
                },
                status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, project_id, task_id, worker_id):
        try:
            project = Project.objects.get(pk=project_id)
        except:
            return Response({'message': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            task = Task.objects.get(pk=task_id)
        except:
            return Response({'message': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            token = request.headers['Authorization'].split()[1]
            user_id = AccessToken(token=token)['user_id']
            # check if user is able to delte task
        except AssertionError:
            return Response({'message': 'Permission denied. You cannot delete workers from this task.'}, status=status.HTTP_403_FORBIDDEN)
        taskcustomuser = Task.objects.get(project=project_id, task=task_id)
        taskcustomuser.delete()
        return Response(
            {
                'message': f'Worker {worker_id} has been successfully deleted from task with id {task_id} from project with id {project_id}.',
            },
            status=status.HTTP_200_OK)