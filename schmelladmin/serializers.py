from rest_framework import serializers
from authmanager.models import User
from authmanager.serializer import UserSerializer
from schmelladmin.models import Idea

class IdeaSerializer (serializers.ModelSerializer):
    createdBy = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='createdBy', write_only=True)
    class Meta:
        model = Idea
        fields = '__all__'
