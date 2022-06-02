from datetime import date, datetime, timedelta

from celery import shared_task
from authmanager.models import User
from mailmanager.sender import SendTaskDeadlineClosing
from cms.models import Game

from taskmanager.models import Task


class DeadlineJob():
    def __init__(self, id, deadline):
        self.id = id
        self.deadline = deadline
    
    def get_seconds_of_delay(self):
        d = datetime.strptime(self.deadline, '%Y-%m-%d %H:%M:%S')
        return (d - datetime.now()).total_seconds()
        
    def alert(self):
        print('Scheduling alert in: ' + str(self.get_seconds_of_delay()) + 'seconds')

    @shared_task(bind = True)
    def set_deadline(self):
        task = Task.objects.get(id = self.id)
        if (task and task.status != 'F'):
            user = User.objects.get(id = task.responsible_id)
            if (user.alerts_deadline): 
                sender = SendTaskDeadlineClosing(
                    task.title, task.description, task.priority, task.deadline, 
                    user.email
                )
                sender.send_mail()
                return 'Alert sent'

class NotUpdatedJob():
    def __init__(self, id):
        self.id = id
    
    def get_game(self):
        return Game.objects.get(id = self.id)
    
    def get_limit(self):
        return date.today() - timedelta(days=14)
    
    def should_update(self):
        return self.get_game().last_updated < self.get_limit()
    
    @shared_task(name='alert_game', bind=True)
    def alert_game_not_updated(self):
        if(self.should_update()):
            want_alert = User.objects.all().filter(alerts_deadlines = True)
            to_emails = []
            for user in want_alert:
                to_emails.append(user.email)
            sender = SendTaskDeadlineClosing(
                self.get_game().title, self.get_game().description,
                self.get_game().last_updated, to_emails)
            sender.send_mail()
            return 'Alert sent'
    
    

