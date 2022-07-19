from rest_framework import serializers
from cms.models import Game, Question, ReadOutFile, Week

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'name', 'description', 'last_updated', 'status', 'logo', 'release_date',)

class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Week
        fields= ('id', 'game', 'week_number')
        
class QuestionSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Question
        fields = ('id', 'type','question_desc', 'phase', 'function', 'related_game', 'related_week', 'punishment')

class ReadOutFileSerializer(serializers.ModelSerializer):
    related_question = QuestionSerializer(read_only=True)
    related_question_id = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all(), source='related_question', write_only=True)
    class Meta:
        model = ReadOutFile
        fields = ('id', 'file', 'related_question', 'gender_voice', 'related_question_id')