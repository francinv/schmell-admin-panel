from cms.models import Game, Question
from schmelladmin.models import Idea
from rest_framework import viewsets, permissions, views
from rest_framework.response import Response

from authmanager.models import User
from taskmanager.models import Task
from .serializers import IdeaSerializer
from datetime import date

class IdeaViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = IdeaSerializer

    def get_queryset(self):
        queryset = Idea.objects.all()
        category = self.request.query_params.get('category')
        createdBy = self.request.query_params.get('user')
        if category is not None:
            queryset = queryset.filter(category=category)
        elif createdBy is not None:
            queryset = queryset.filter(createdBy = createdBy)
        return queryset
        
class StaticsViewSet(views.APIView):
    permission_classes = [permissions.AllowAny]
    allowed_methods = ['GET']
    
    def get(self, request, format=None):
        users_count = User.objects.all().count()
        questions_count = Question.objects.all().count()
        game_count = Game.objects.all().count()
        tasks_queryset = Task.objects.all()
        unsolved_tasks_count = tasks_queryset.exclude(status = 'F').count()
        overdue_tasks_count = tasks_queryset.filter(deadline__lt =date.today()).exclude(status= 'F').count()
        development_tasks_count = tasks_queryset.filter(category = 'D').count()
        game_tasks_count = tasks_queryset.filter(category = 'G').count()
        design_tasks_count = tasks_queryset.filter(category = 'W').count()
        marketing_tasks_count = tasks_queryset.filter(category = 'M').count()
        economy_tasks_count = tasks_queryset.filter(category = 'E').count()

        id_of_games = []
        temp_list_games = Game.objects.all()

        for game in temp_list_games.iterator():
            id_of_games.append(game.id)

        response_count_of_questions_by_game = {}
        for id in id_of_games:
            count_of_questions = Question.objects.all().filter(related_game = id).count()
            response_count_of_questions_by_game.update({'N'+str(id): count_of_questions})

        return Response(
            {
                'Users': {
                    'count': users_count
                },
                'Game': {
                    'count': game_count
                },
                'Questions': {
                    'total_count': questions_count,
                    'count_by_game':response_count_of_questions_by_game
                },
                'Task': {
                    'unsolved': unsolved_tasks_count,
                    'overdue': overdue_tasks_count,
                    'development': development_tasks_count,
                    'game': game_tasks_count,
                    'design': design_tasks_count,
                    'marketing': marketing_tasks_count,
                    'economy': economy_tasks_count
                },
            }
        )
