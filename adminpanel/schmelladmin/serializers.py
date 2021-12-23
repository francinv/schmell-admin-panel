from rest_framework import serializers
from schmelladmin.models import Game, Question, User

# Game serializer
class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


#Question serializer
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'mobile_number', 'alerts_task', 'alerts_deadlines', 'profile_picture')

