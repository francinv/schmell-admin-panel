from django.db.models import fields
from rest_framework import serializers
from adminAPI.models import Game, WeekGame, Question

# Game serializer
class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

# WeekGame serializer
class WeekGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeekGame
        fields = '__all__'

#Question serializer
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
