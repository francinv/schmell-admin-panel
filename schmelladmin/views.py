from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_api_key.models import APIKey

class APIKeyViewSet(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        data = request.data
        response = Response()
        name = data.get('name', None)
        api_key, key = APIKey.objects.create_key(name=name)
        response.data = {"key": key}
        return response