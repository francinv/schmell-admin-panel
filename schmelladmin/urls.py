from rest_framework import routers, urlpatterns
from .api import CommentViewSet, IdeaViewSet, LoginViewSet, RefreshViewSet, StaticsViewSet, TaskViewSet, UserViewSet, GameViewSet, QuestionViewSet, WeekViewSet, ChangePasswordView
from .views import APIKeyViewSet
from django.urls import path

router = routers.DefaultRouter()
router.register('game', GameViewSet, 'weekgame')
router.register('question', QuestionViewSet, 'question')
router.register('user', UserViewSet, 'user')
router.register('auth/login', LoginViewSet, 'login')
router.register('auth/refresh', RefreshViewSet, 'auth-refresh')
router.register('week', WeekViewSet, 'week')
router.register('idea', IdeaViewSet, 'ideas')
router.register('task', TaskViewSet, 'tasks')
router.register('comment', CommentViewSet, 'comments')


urlpatterns = [
    path('statistics', StaticsViewSet.as_view(), name='statistics_view'),
    path('auth/password/<int:pk>/', ChangePasswordView.as_view(), name='updatepassword_view'),
    path('auth/generate_key/', APIKeyViewSet.as_view(), name='generatekey_view')
]

urlpatterns += router.urls