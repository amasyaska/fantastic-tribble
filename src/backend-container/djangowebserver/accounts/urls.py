from django.urls import path

from .views import UserAPIView, LoginAPIView

urlpatterns = [
    path('user/', UserAPIView.as_view(http_method_names=['post', 'options'])),
    path('user/<int:id>', UserAPIView.as_view(http_method_names=['get', 'put', 'delete'])),

    path('login/', LoginAPIView.as_view()),
]