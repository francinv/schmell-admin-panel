from django.urls import path
from rest_framework import routers, urlpatterns
from authmanager.api import ChangePasswordView, LoginViewSet, RefreshViewSet, TokenActiveViewSet, UserViewSet
from authmanager.views import APIKeyViewSet

router = routers.DefaultRouter()
router.register('user', UserViewSet, 'user')
router.register('login', LoginViewSet, 'login')
router.register('key/refresh', RefreshViewSet, 'key-refresh')
router.register('key/validate', TokenActiveViewSet, 'key-validate')

urlpatterns = [
    path('key/generate', APIKeyViewSet.as_view(), name='generatekey_view'),
    path('password/<int:pk>', ChangePasswordView.as_view(), name='updatepassword_view'),
]

urlpatterns += router.urls