from rest_framework import routers, urlpatterns
from .api import CommentViewSet, ConversationViewSet, IdeaViewSet, LoginViewSet, RefreshViewSet, TaskViewSet, UserViewSet, GameViewSet, QuestionViewSet, WeekViewSet

router = routers.DefaultRouter()
router.register('game', GameViewSet, 'weekgame')
router.register('question', QuestionViewSet, 'question')
router.register('user', UserViewSet, 'user')
router.register('auth/login', LoginViewSet, 'login')
router.register('auth/refresh', RefreshViewSet, 'auth-refresh')
router.register('week', WeekViewSet, 'week')
router.register('idea', IdeaViewSet, 'ideas')
router.register('task', TaskViewSet, 'tasks')
router.register('conversation', ConversationViewSet, 'conversation')
router.register('comment', CommentViewSet, 'comments')

urlpatterns = router.urls