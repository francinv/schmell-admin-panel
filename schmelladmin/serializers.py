from rest_framework import serializers
from schmelladmin.models import Game, Idea, Question, Task, User, Week
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login


# Game serializer
class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'name', 'description', 'related_questions', 'last_updated', 'status', 'logo', 'release_date',)

class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Week
        fields='__all__'
        
#Question serializer
class QuestionSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Question
        fields = ('id', 'type','question_desc', 'hint', 'related_question', 'phase', 'function', 'related_game', 'related_week')

#User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'mobile_number', 'alerts_task', 'alerts_deadlines', 'profile_picture')

#Login serializer
class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data

#Idea serializer
class IdeaSerializer (serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = ('id', 'text', 'category', 'createdBy')

#Task serializer
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'date', 'title', 'description', 'status', 'deadline', 'category', 'priority', 'responsible', 'related_game')