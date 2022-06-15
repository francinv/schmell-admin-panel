from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('api/admin/', include('schmelladmin.urls')),
    path('api/auth/', include('authmanager.urls')),
    path('api/tasks/', include('taskmanager.urls')),
    path('api/cms/', include('cms.urls')),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
