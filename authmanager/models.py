from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    mobile_number = models.IntegerField(blank=True, null=True)
    alerts_task = models.BooleanField(default=True, blank=True)
    alerts_deadlines = models.BooleanField(default=True, blank=True)
    profile_picture = models.ImageField(upload_to="profile-pictures/", blank=True)

    def __str__(self): 
        return self.username