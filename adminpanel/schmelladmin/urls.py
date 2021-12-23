from rest_framework import routers, urlpatterns
from .api import UserViewSet, GameViewSet, QuestionViewSet

router = routers.DefaultRouter()
router.register('game', GameViewSet, 'weekgame')
router.register('game_question', QuestionViewSet, 'question')
router.register('user', UserViewSet, 'users')

urlpatterns = router.urls