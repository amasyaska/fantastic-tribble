from django.urls import path

from .views import CompanyAPIView, CompanyMembersAPIView, ProjectAPIView

urlpatterns = [
    path('company/', CompanyAPIView.as_view(http_method_names=['post', 'options'])),
    path('company/<int:id>', CompanyAPIView.as_view(http_method_names=['get', 'put', 'delete'])),
    path('company/<int:company_id>/members/', CompanyMembersAPIView.as_view(http_method_names=['get', 'post', 'put'])),
    path('company/<int:company_id>/members/<int:member_id>', CompanyMembersAPIView.as_view(http_method_names=['delete'])),

    path('project/', ProjectAPIView.as_view(http_method_names=['post', 'options'])),
    path('project/<int:project_id>', ProjectAPIView.as_view(http_method_names=['get', 'put', 'delete'])),
]