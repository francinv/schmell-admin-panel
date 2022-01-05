
from rest_framework.decorators import permission_classes
from schmelladmin.models import Game, Question, User, Week
from rest_framework import viewsets, permissions

from .serializers import GameSerializer, QuestionSerializer, UserSerializer, WeekSerializer

# Game Viewset
class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = Game.objects.all()
        name = self.request.query_params.get('name')
        if name is not None:
            queryset = queryset.filter(name=name)
        return queryset
    

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

