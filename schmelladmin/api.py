from schmelladmin.models import Game, Question, User, Week
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .serializers import GameSerializer, LoginSerializer, QuestionSerializer, UserSerializer, WeekSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.db.models import Count

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
    


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            queryset = User.objects.all()
            return queryset

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

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

