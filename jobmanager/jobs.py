from datetime import date, datetime, timedelta, tzinfo
from dateutil.parser import parse
from celery import shared_task
from authmanager.models import User
from mailmanager.sender import SendTaskDeadlineClosing
from cms.models import Game

from taskmanager.models import Task

def get_seconds_of_delay(deadline):
        d = parse(deadline, tzinfos=None)
        naive = d.replace(tzinfo=None)
        return (naive - datetime.now()).total_seconds()
        
def scheduling_alert(seconds_of_delay):
    print('Scheduling alert in: ' + str(seconds_of_delay) + 'seconds')

@shared_task(bind = True)
def set_deadline(self, id):
    task = Task.objects.get(id = id)
    if (task and task.status != 'F'):
        user = User.objects.get(id = task.responsible_id)
        if (user.alerts_deadlines): 
            sender = SendTaskDeadlineClosing(
                task.title, task.description, task.priority, task.deadline, 
                user.email
            )
            sender.send_mail()
            return 'Alert sent'

@shared_task(name='alert_game', bind=True)
def alert_game_not_updated(id):
    game = Game.objects.get(id = id)
    limit = date.today() - timedelta(days=14)
    if (game.last_updated < limit):
        want_alert = User.objects.all().filter(alerts_deadlines = True)
        to_emails = []
        for user in want_alert:
            to_emails.append(user.email)
        sender = SendTaskDeadlineClosing(
            game.title, game.description,
            game.last_updated, to_emails)
        sender.send_mail()
        return 'Alert sent'
    
    

