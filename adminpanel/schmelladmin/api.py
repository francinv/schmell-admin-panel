
from rest_framework.decorators import permission_classes
from schmelladmin.models import Game, Question, User, Week
from rest_framework import viewsets, permissions

from .serializers import GameSerializer, QuestionSerializer, UserSerializer, WeekSerializer

# Game Viewset
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer

class WeekViewSet(viewsets.ModelViewSet):
    queryset = Week.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WeekSerializer

# Question Viewset
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = QuestionSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

