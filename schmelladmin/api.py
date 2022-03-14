from schmelladmin.models import Comment, Game, Idea, Question, Task, User, Week
from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response
from .serializers import CommentSerializer, GameSerializer, IdeaSerializer, LoginSerializer, QuestionSerializer, TaskSerializer, UserSerializer, WeekSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from .pagination import CustomPagination
from datetime import date, datetime
from django.core.mail import send_mail

# Game Viewset
class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def get_queryset(self):
        queryset = Game.objects.all()
        name = self.request.query_params.get('name')
        status = self.request.query_params.get('status')
        if name is not None:
            queryset = queryset.filter(name=name)
        if status is not None:
            queryset = queryset.filter(status=status)
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
        permissions.IsAuthenticated
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
        permissions.IsAuthenticated
    ]
    serializer_class = QuestionSerializer
    def get_queryset(self):
        queryset = Question.objects.all()
        related_week = self.request.query_params.get('related_week')
        related_game = self.request.query_params.get('game')
        if related_week is not None:
            queryset = queryset.filter(related_week=related_week)
        elif related_game is not None:
            queryset = queryset.filter(related_game=related_game)
        return queryset
    
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

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Task.objects.all()      
        sort = self.request.query_params.get('sort')
        status = self.request.query_params.get('status')
        priority = self.request.query_params.get('priority')
        responsible = self.request.query_params.get('responsible')
        deadline = self.request.query_params.get('deadline')
        filter = self.request.query_params.get('filter')
        if (sort is not None and status is not None):
            queryset = switchSort(queryset, sort)
            queryset = queryset.filter(status = status)
        elif (sort is not None and responsible is not None):
            queryset = switchSort(queryset, sort)
            queryset = queryset.filter(responsible = responsible)            
        elif (sort is not None and priority is not None):
            queryset = switchSort(queryset, sort)
            queryset = queryset.filter(priority = priority)   
        elif (deadline is not None and sort is not None):
            queryset = switchSort(queryset, sort)
            queryset = queryset.filter(deadline__lt = deadline).exclude(status = 'F')
        elif (sort is not None and filter == 'ONLY_ACT'):
            queryset = switchSort(queryset, sort)
            queryset = queryset.exclude(status = 'F')
        if ((sort is not None) and (filter == 'ONLY_ACT') and (responsible is not None)):
            queryset = switchSort(queryset, sort)
            queryset = queryset.filter(responsible = responsible).exclude(status = 'F')
        elif ((status is None) or (priority is None) or (responsible is None) or (deadline is None) or (filter is None)) and (sort is not None):
            queryset = switchSort(queryset, sort)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()
        title = serializer.data['title']
        description = serializer.data['description']
        resp_firstname = serializer.data['responsible']['first_name']
        resp_lastname = serializer.data['responsible']['last_name']
        priority = str(serializer.data['priority'])
        nonformatted_deadline = serializer.data['deadline']
        d = datetime.fromisoformat(nonformatted_deadline [:-1])
        deadline = d.strftime('%Y-%m-%d %H:%M:%S')
        message = 'Hei, det har blitt lagt til en ny oppgave. \n\n' + 'Tittel: ' + title + '\n' + 'Beskrivelse: ' + description + '\n' + 'Ansvarlig: ' + resp_firstname + ' ' + resp_lastname + '\n' + 'Prioritet: ' + priority + '\n' + 'Frist: ' + deadline + '\n' + 'Gå til panelet for å fullføre oppgaven: www.schmell-staging.herokuapp.com/ \n\nMvh Schmell :-)' 
        user_queryset = User.objects.all()
        want_alert = user_queryset.filter(alerts_task = True)
        to_emails = []
        for user in want_alert:
            to_emails.append(user.email)
        if (len(to_emails) > 0):
            print(to_emails)
            send_mail(
                subject = 'Ny arbeidsoppgave lagt til: ' + title,
                message = message,
                from_email='schmellapp@gmail.com',
                recipient_list = to_emails
            )
            
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        return queryset

class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all()
        related_task = self.request.query_params.get('task')
        if related_task is not None:
            queryset = queryset.filter(related_task = related_task) 
            queryset = queryset.order_by('date')
        
        return queryset
        
class LoginViewSet(viewsets.ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (permissions.AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    permission_classes = (permissions.AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class StaticsViewSet(views.APIView):
    permission_classes = [permissions.AllowAny]
    
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




def switchSort(queryset, sort):
    if sort == 'PRIORITY_HTL':
        queryset = queryset.order_by('priority')           
    elif sort == 'PRIORITY_LTH':
        queryset = queryset.order_by('-priority')
    elif sort == 'DEADLINE_DESC':
        queryset = queryset.order_by('-deadline')
    elif sort == 'DEADLINE_ASC':
        queryset = queryset.order_by('deadline')
    elif sort == 'PUBL_DESC':
        queryset = queryset.order_by('-date')
    elif sort == 'UPDT_DESC':
        queryset = queryset.order_by('-updated')
    elif sort == 'UPDT_ASC': 
        queryset = queryset.order_by('updated')
    return queryset
