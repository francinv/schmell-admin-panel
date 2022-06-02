from rest_framework import routers, urlpatterns
from .api import IdeaViewSet, StaticsViewSet
from django.urls import path

router = routers.DefaultRouter()
router.register('idea', IdeaViewSet, 'ideas')

urlpatterns = [path('statistics', StaticsViewSet.as_view(), name='statistics_view')]

urlpatterns += router.urls