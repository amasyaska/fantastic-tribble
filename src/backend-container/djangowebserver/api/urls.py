from django.urls import path, include

urlpatterns = [
    # v1
    path('v1/accounts/', include('accounts.urls')),
    path('v1/', include('business_logic.urls')),
]

