from rest_framework import routers, urlpatterns
from .api import UserViewSet, GameViewSet, QuestionViewSet, WeekViewSet

router = routers.DefaultRouter()
router.register('game', GameViewSet, 'weekgame')
router.register('question', QuestionViewSet, 'question')
router.register('user', UserViewSet, 'users')
router.register('week', WeekViewSet, 'week')

urlpatterns = router.urls