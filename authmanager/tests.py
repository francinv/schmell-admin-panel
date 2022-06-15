from django.test import TestCase
from authmanager.models import User

class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(username="testuser", password="testpassword", 
            email="test@mail.com", mobile_number=1234567890, alerts_task=True,
            alerts_deadlines=True)
    
    def test_user_creation(self):
        user = User.objects.get(username="testuser")
        self.assertTrue(isinstance(user, User))
        self.assertEqual(user.username, "testuser")

