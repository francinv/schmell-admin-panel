from rest_framework import routers, urlpatterns
from .api import AccountsViewSet, GameViewSet, WeekGameViewSet, QuestionViewSet

router = routers.DefaultRouter()
router.register('game', GameViewSet, 'games')
router.register('game/week', WeekGameViewSet, 'weekgame')
router.register('game/week/question', QuestionViewSet, 'question')
router.register('user', AccountsViewSet, 'accounts')

urlpatterns = router.urls