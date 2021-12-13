from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('adminAPI.urls')),  
    path('', include('frontend.urls'))
]
