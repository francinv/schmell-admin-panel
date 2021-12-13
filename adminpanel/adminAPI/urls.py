from rest_framework import routers, urlpatterns
from .api import GameViewSet, WeekGameViewSet, QuestionViewSet

router = routers.DefaultRouter()
router.register('api/game', GameViewSet, 'games')
router.register('api/game/week', WeekGameViewSet, 'weekgame')
router.register('api/game/week/question', QuestionViewSet, 'question')

urlpatterns = router.urls