from schmelladmin.models import Comment, Conversation, Game, Idea, Question, Task, User, Week
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .serializers import CommentSerializer, ConversationSerializer, GameSerializer, IdeaSerializer, LoginSerializer, QuestionSerializer, TaskSerializer, UserSerializer, WeekSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.db.models import Q

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

    def get_queryset(self):
        queryset = Task.objects.all()
        filterMethod = self.request.query_params.get('filterMethod')
        filterValue = self.request.query_params.get('filterValue')        
        sort = self.request.query_params.get('sort')
        if filterMethod is None and sort == 'PUBL_DESC':
           queryset = queryset.order_by('-date')
        elif filterMethod is not None and sort is not None and filterValue is not None:
            if sort == 'PRIORITY_HTL':
                queryset = queryset.order_by('priority')
                queryset = switchFilter(queryset, filterMethod, filterValue)                
            elif sort == 'PRIORITY_LTH':
                queryset = queryset.order_by('-priority')
                queryset = switchFilter(queryset, filterMethod, filterValue)
            elif sort == 'DEADLINE_DESC':
                queryset = queryset.order_by('-deadline')
                queryset = switchFilter(queryset, filterMethod, filterValue)
            elif sort == 'DEADLINE_ASC':
                queryset = queryset.order_by('deadline')
                queryset = switchFilter(queryset, filterMethod, filterValue)
        elif filterMethod is None and sort is not None and filterValue is None:
            if sort == 'PUBL_DESC':
                queryset = queryset.order_by('-date')
            elif sort == 'PRIORITY_HTL':
                queryset = queryset.order_by('priority')
            elif sort == 'PRIORITY_LTH':
                queryset = queryset.order_by('-priority')
            elif sort == 'DEADLINE_DESC':
                queryset = queryset.order_by('-deadline')
            elif sort == 'DEADLINE_ASC':
                queryset = queryset.order_by('deadline')
            queryset = queryset.filter(Q(status='P') | Q(status='D'))
        elif filterMethod is not None and sort == 'PUBL_DESC' and filterValue is not None:
            queryset = queryset.order_by('-date')
            queryset = switchFilter(queryset, filterMethod, filterValue)
        return queryset

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        return queryset

class ConversationViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ConversationSerializer

    def get_queryset(self):
        queryset = Conversation.objects.all()
        related_task = self.request.query_params.get('task')
        if related_task is not None:
            queryset = queryset.filter(related_task=related_task)
        return queryset

class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all()
        related_conversation = self.request.query_params.get('conversation')
        if related_conversation is not None:
            queryset = queryset.filter(related_conversation = related_conversation) 
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


def switchFilter(queryset, filterMethod, filterValue):
    if filterMethod == 'PRIORITY':
        queryset = queryset.filter(Q(status='P') | Q(status='D'), priority = filterValue)
    elif filterMethod == 'RESPONSIBLE':
        queryset = queryset.filter(Q(status='P') | Q(status='D'), responsible = filterValue)
    elif filterMethod == 'STATUS':
        queryset = queryset.filter(status = filterValue)
    return queryset
