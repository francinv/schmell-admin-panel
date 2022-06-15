from django.db import router
from rest_framework import routers
from cms.api import GameViewSet, QuestionViewSet, ReadOutFileViewset, WeekViewSet


router = routers.DefaultRouter()
router.register('game', GameViewSet, 'game')
router.register('question', QuestionViewSet, 'question')
router.register('week', WeekViewSet, 'week')
router.register('files/readout', ReadOutFileViewset, 'files/readout')

urlpatterns = router.urls