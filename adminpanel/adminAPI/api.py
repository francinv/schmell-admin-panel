from rest_framework.decorators import permission_classes
from adminAPI.models import Game, WeekGame, Question, Account
from rest_framework import serializers, viewsets, permissions

from .serializers import AccountSerializer, GameSerializer, WeekGameSerializer, QuestionSerializer

# Game Viewset
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer

# WeekGame Viewset
class WeekGameViewSet(viewsets.ModelViewSet):
    queryset = WeekGame.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WeekGameSerializer

# Question Viewset
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = QuestionSerializer

class AccountsViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AccountSerializer