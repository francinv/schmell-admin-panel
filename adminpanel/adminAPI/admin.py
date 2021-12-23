from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Game, Question, User


admin.site.register(User, UserAdmin)
admin.site.register(Game)
admin.site.register(Question)

