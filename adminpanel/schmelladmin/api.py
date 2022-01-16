
from rest_framework.decorators import permission_classes
from schmelladmin.models import Game, Question, User, Week
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

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
    
    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

class WeekViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WeekSerializer

    def get_queryset(self):
        queryset = Week.objects.all()
        game = self.request.query_params.get('game')
        if game is not None:
            queryset = queryset.filter(game=game)
        return queryset

# Question Viewset
class QuestionViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = QuestionSerializer
    def get_queryset(self):
        queryset = Question.objects.all()
        related_week = self.request.query_params.get('related_week')
        if related_week is not None:
            queryset = queryset.filter(related_week=related_week)
        return queryset

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

