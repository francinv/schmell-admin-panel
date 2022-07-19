from rest_framework import viewsets, permissions, status
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.response import Response

from cms.models import Game, Question, ReadOutFile, Week
from cms.serializers import GameSerializer, QuestionSerializer, ReadOutFileSerializer, WeekSerializer
from jobmanager.jobs import alert_game_not_updated
from schmelladmin.pagination import CustomPagination


class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    permission_classes = [permissions.IsAuthenticated | HasAPIKey]
    def get_queryset(self):
        queryset = Game.objects.all()
        name = self.request.query_params.get('name')
        status = self.request.query_params.get('status')
        if name is not None:
            queryset = queryset.filter(name=name)
        if status is not None:
            queryset = queryset.filter(status=status)
        return queryset
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()
        alert_game_not_updated(serializer.data['id'])

class WeekViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated | HasAPIKey]
    serializer_class = WeekSerializer

    def get_queryset(self):
        queryset = Week.objects.all()
        game = self.request.query_params.get('game')
        week_number = self.request.query_params.get('weekNum')
        if game is not None:
            queryset = queryset.filter(game=game)
        if week_number is not None:
            queryset = queryset.filter(week_number=week_number)
        return queryset

class QuestionViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated | HasAPIKey]
    serializer_class = QuestionSerializer

    def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            
    def get_queryset(self):
        queryset = Question.objects.all()
        related_week = self.request.query_params.get('related_week')
        related_game = self.request.query_params.get('game')
        if related_week is not None:
            queryset = queryset.filter(related_week=related_week)
        elif related_game is not None:
            queryset = queryset.filter(related_game=related_game)
        return queryset

class ReadOutFileViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated | HasAPIKey]
    serializer_class = ReadOutFileSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = ReadOutFile.objects.all()
        related_question = self.request.query_params.get('questionid')
        question_desc = self.request.query_params.get('question')
        if related_question is not None:
            queryset = queryset.filter(related_question = related_question)
        if question_desc is not None:
            question_queryset = Question.objects.all().filter(question_desc__contains = question_desc)
            if question_queryset.count() > 0:
                queryset = queryset.filter(related_question__in = question_queryset)
        return queryset