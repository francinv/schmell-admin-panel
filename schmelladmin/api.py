from schmelladmin.models import Comment, Game, Idea, Question, Task, User, Week
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .serializers import CommentSerializer, GameSerializer, IdeaSerializer, LoginSerializer, QuestionSerializer, TaskSerializer, UserSerializer, WeekSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.db.models import Q
from .pagination import CustomPagination

# Game Viewset
class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    permission_classes = [
        permissions.IsAuthenticated
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
        if (sort is not None and status is not None):
            queryset = switchSort(queryset, sort)
            queryset = queryset.filter(status = status)
        elif (sort is not None and responsible is not None):
            queryset = switchSort(queryset, sort)
            queryset = queryset.filter(responsible = responsible)            
        elif (sort is not None and priority is not None):
            queryset = switchSort(queryset, sort)
            queryset = queryset.filter(priority = priority)   
        elif ((status is None) or (priority is None) or (responsible is None)) and (sort is not None):
            queryset = switchSort(queryset, sort)
        return queryset

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