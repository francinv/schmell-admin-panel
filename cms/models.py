from django.db import models
from django.db.models.fields import CharField

from cms.constant import ALLOWED_WEEKS, STATUS

class Game(models.Model):
    name = models.CharField(max_length=200, blank=True)
    description = models.CharField(max_length=500, blank=True)
    related_questions = models.BooleanField(default=False, blank=True)
    last_updated = models.DateField(blank=True)
    status = models.CharField(max_length=1, choices=STATUS, blank=True)
    logo = models.ImageField(upload_to="game-pictures/", blank=True)
    release_date = models.DateTimeField(blank=True)
    def __str__(self): 
        return self.name

class Week(models.Model):
    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE
    )
    week_number = CharField(max_length=2, choices=ALLOWED_WEEKS)
    
    def __str__(self): 
        return self.game.name + " | Week " + self.week_number
    
class Question(models.Model): 
    related_week = models.ForeignKey(Week, on_delete=models.CASCADE, default=0)
    related_game = models.ForeignKey(Game, on_delete=models.CASCADE)
    type = models.CharField(max_length=200)
    question_desc = models.CharField(max_length=500)
    hint = models.CharField(max_length=500)
    related_question = models.IntegerField(blank=True)
    phase = models.IntegerField()
    function = models.CharField(blank=True, max_length=200)
    punishment = models.CharField(max_length=200)

    def __str__(self): 
        return self.id + " " + self.question_desc

class ReadOutFile(models.Model):
    ALLOWED_GENDERS = (
        ('M', 'Male'), ('F', 'Female')
    )
    related_question = models.ForeignKey(Question, on_delete=models.CASCADE)
    file = models.FileField(upload_to="readout-files/", blank=True)
    gender_voice = models.CharField(max_length=1, choices=ALLOWED_GENDERS)