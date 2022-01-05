
from rest_framework.decorators import permission_classes
from schmelladmin.models import Game, Question, User
from rest_framework import viewsets, permissions

from .serializers import GameSerializer, QuestionSerializer, UserSerializer

# Game Viewset
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer

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