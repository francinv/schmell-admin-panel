from rest_framework import serializers
from authmanager.models import User
from authmanager.serializer import UserSerializer
from taskmanager.models import Comment, Task


class TaskSerializer(serializers.ModelSerializer):
    responsible = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='responsible', write_only=True)
    class Meta:
        model = Task
        fields = ('id', 'date', 'title', 'description', 'status', 'deadline', 'category', 'priority', 'responsible', 'related_game', 'user_id', 'updated')
        
class CommentSerializer(serializers.ModelSerializer):
    written_by = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='written_by', write_only=True)
    class Meta:
        model = Comment
        fields = ('id', 'date', 'comment', 'written_by', 'related_task', 'user_id')