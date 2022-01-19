from django.urls import path
from rest_framework import routers, urlpatterns
from rest_framework.authtoken.views import obtain_auth_token
from .api import LoginViewSet, RefreshViewSet, UserViewSet, GameViewSet, QuestionViewSet, WeekViewSet

router = routers.DefaultRouter()
router.register('game', GameViewSet, 'weekgame')
router.register('question', QuestionViewSet, 'question')
router.register('user', UserViewSet, 'user')
router.register('auth/login', LoginViewSet, 'login')
router.register('auth/refresh', RefreshViewSet, 'auth-refresh')
router.register('week', WeekViewSet, 'week')

urlpatterns = router.urls