from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields import CharField

class User(AbstractUser):
    mobile_number = models.IntegerField(blank=True, null=True)
    alerts_task = models.BooleanField(default=True, blank=True)
    alerts_deadlines = models.BooleanField(default=True, blank=True)
    profile_picture = models.ImageField(upload_to="profile-pictures/", blank=True)

    def __str__(self): 
        return self.username

class Game(models.Model):
    STATUS = (
        ('D', 'Development'),
        ('R', 'Ready'),
        ('P', 'Deployed'),
    )
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
    punishment = models.CharField(max_length=200, default="2 slurker")

class Idea(models.Model):
    CATEGORIES = (
        ('G', 'Games'),
        ('D', 'Development'),
        ('W', 'Design'),
        ('E', 'Various')
    )
    text = models.CharField(max_length=250)
    category = models.CharField(max_length=1, choices=CATEGORIES)
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE)

class Task(models.Model):
    STATUS = (
        ('P', 'Pending'),
        ('D', 'Doing'),
        ('F', 'Finished')
    )
    CATEGORIES = (
        ('G', 'Games'),
        ('D', 'Development'),
        ('W', 'Design'),
        ('M', 'Marketing'),
        ('E', 'Economy')
    )
    PRIORITIES = (
        ( 3, 'Low'),
        ( 2, 'Medium'),
        ( 1, 'High')
    )
    date = models.DateField(auto_now_add=True)
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
