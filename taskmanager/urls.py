from rest_framework import routers
from taskmanager.api import CommentViewSet, TaskViewSet

router = routers.DefaultRouter()
router.register('task', TaskViewSet, 'tasks')
router.register('comment', CommentViewSet, 'comments')

urlpatterns = router.urls
