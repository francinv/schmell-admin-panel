from datetime import date, datetime, timedelta

from celery import shared_task
from .models import Task, User, Game
from django.core.mail import send_mail
from schmelladmin.utils import get_game_status

@shared_task(bind=True)
def alert_deadline_closing(self, task_id):
    task = Task.objects.get(id = task_id)
    if (task):
        if (task.status != 'F'):
            title = task.title
            description = task.description
            priority = task.priority
            nonformatted_deadline = task.deadline
            deadline = nonformatted_deadline.strftime('%Y-%m-%d %H:%M:%S')
            print(deadline)
            user = User.objects.get(id = task.responsible_id)
            if (user.alerts_deadlines):
                send_mail(
                    subject= 'Uløst oppgave: ' + title,
                    message= 'Du har en uløst oppgave. Det er mindre enn 24 timer til fristen går ut. Vennligst fullfør oppgaven.' 
                        + '\n\nInfo om oppgaven:\n'
                        'Tittel: ' + title + '\n' 
                        + 'Beskrivelse: ' + description + '\n'
                        + 'Prioritet: ' + str(priority) + '\n'
                        + 'Frist: ' + deadline + '\n\n'
                        + 'Gå til panelet for å fullføre oppgaven: https://schmell-staging.herokuapp.com/ \n\nMvh Schmell :-)',
                    from_email='schmellapp@gmail.com',
                    recipient_list = [user.email]
                )
                
    return 'Alert successfully sent.'

@shared_task(name='alert_game', bind=True)
def alert_game_not_updated(self, game_id):
    game = Game.objects.get(id = game_id)
    if(game):
        updated = game.last_updated
        limit_date = date.today() - timedelta(days=14)
        if (updated < limit_date):
            name = game.name
            description = game.description
            last_updated = game.last_updated
            want_alert = User.objects.all().filter(alerts_deadlines = True)
            to_emails = []
            for user in want_alert:
                to_emails.append(user.email)
            if (len(to_emails) > 0):
                send_mail (
                    subject= 'Spill ikke oppdatert på 2 uker',
                    message= name + ' har ikke blitt oppdatert på 2 uker.' + '\n\n'
                        + 'Informasjon om spillet:\n'
                        + 'Navn: ' + name + '\n'
                        + 'Beskrivelse: ' + description + '\n'
                        + 'Status: ' + get_game_status(game.status) + '\n'
                        + 'Sist oppdatert: ' +  str(last_updated) + '\n'
                        + 'Gå til panelet for å oppdatere spillet: https://schmell-staging.herokuapp.com/ \n\nMvh Schmell :-)',
                        from_email='schmellapp@gmail.com',
                        recipient_list = to_emails
                )
    return 'Alert successfully sent.'