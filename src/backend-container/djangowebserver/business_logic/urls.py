from django.urls import path

from .views import CompanyAPIView

urlpatterns = [
    path('company/', CompanyAPIView.as_view(http_method_names=['post', 'options'])),
]