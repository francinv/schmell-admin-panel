from django.db import models
from authmanager.models import User
from schmelladmin.constant import CATEGORIES

class Idea(models.Model):
    text = models.CharField(max_length=250)
    category = models.CharField(max_length=1, choices=CATEGORIES)
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE)
