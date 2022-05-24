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
        temp_api_key = APIKey.objects.filter(name=name, revoked=False)
        if(temp_api_key.exists()):
            response.data = {'error': 'API Key already exists'}
            response.status_code = 400
        else:
            api_key, key = APIKey.objects.create_key(name=name)
            response.data = {
                'key': name,
                "api_key": key
            }
        return response