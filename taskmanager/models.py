from django.db import models
from authmanager.models import User
from cms.models import Game
from taskmanager.constant import CATEGORIES, PRIORITIES, STATUS

class Task(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    status = models.CharField(max_length=1, choices=STATUS)
    deadline = models.DateTimeField()
    category = models.CharField(max_length=1, choices=CATEGORIES)
    priority = models.IntegerField(choices=PRIORITIES)
    responsible = models.ForeignKey(User, on_delete=models.CASCADE)
    related_game = models.ForeignKey(Game, on_delete=models.CASCADE, blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self): 
            return self.title

class Comment(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    comment = models.CharField(max_length=500)
    written_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    related_task = models.ForeignKey(Task, on_delete=models.CASCADE)
