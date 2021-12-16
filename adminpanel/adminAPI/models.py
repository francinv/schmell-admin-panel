from django.db import models
from django.contrib.auth.models import AbstractUser, User

class Account(models.Model): 
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile = models.BigIntegerField()
    tasks_alert = models.BooleanField(default=True)
    deadline_alert = models.BooleanField(default=True)
    profile_picture = models.ImageField(upload_to="profile-pictures/")
    
    def __str__(self): 
        return self.user.username


class Game(models.Model):
    STATUS = (
        ('D', 'Development'),
        ('R', 'Ready'),
        ('P', 'Deployed'),
    )
    name = models.CharField(max_length=200)
    last_updated = models.DateField()
    related_tasks = models.IntegerField(default=0)
    description = models.CharField(max_length=500)
    related_questions = models.BooleanField(default=False)
    status = models.CharField(max_length=1, choices=STATUS)
    release_date = models.DateTimeField(blank=True)
    logo = models.ImageField(upload_to="game-pictures/")

class WeekGame(models.Model): 
    ALLOWED_WEEKS = (
        (1, 'Week 1'), (2, 'Week 2'), (3, 'Week 3'), (4, 'Week 4'), (5, 'Week 5'), (6, 'Week 6'),
        (7, 'Week 7'), (8, 'Week 8'), (9, 'Week 9'), (10, 'Week 10'), (11, 'Week 11'), (12, 'Week 12'),
        (13, 'Week 13'), (14, 'Week 14'), (15, 'Week 15'), (16, 'Week 16'), (17, 'Week 17'), (18, 'Week 18'),
        (19, 'Week 19'), (20, 'Week 20'), (21, 'Week 21'), (22, 'Week 22'), (23, 'Week 23'), (24, 'Week 24'),
        (25, 'Week 25'), (26, 'Week 26'), (27, 'Week 27'), (28, 'Week 28'), (29, 'Week 29'), (30, 'Week 30'),
        (31, 'Week 31'), (32, 'Week 32'), (33, 'Week 33'), (34, 'Week 34'), (35, 'Week 35'), (36, 'Week 36'),
        (37, 'Week 37'), (38, 'Week 38'), (39, 'Week 39'), (40, 'Week 40'), (41, 'Week 41'), (42, 'Week 42'),
        (43, 'Week 43'), (44, 'Week 44'), (45, 'Week 45'), (46, 'Week 46'), (47, 'Week 47'), (48, 'Week 48'),
        (49, 'Week 49'), (50, 'Week 50'), (51, 'Week 51'), (52, 'Week 52')
    )
    week_number = models.IntegerField(choices=ALLOWED_WEEKS)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)

class Question(models.Model): 
    related_week = models.ForeignKey(WeekGame, on_delete=models.CASCADE)
    type = models.CharField(max_length=200)
    question_desc = models.CharField(max_length=500)
    hint = models.CharField(max_length=500)
    related_question = models.CharField(blank=True, max_length=200)
    phase = models.IntegerField()
    function = models.CharField(blank=True, max_length=200)







