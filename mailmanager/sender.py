from datetime import datetime
from django.core.mail import send_mail
from mailmanager.constant import FROM_EMAIL

from mailmanager.helpers import parseStatusToString


class SendTaskCreatedMail():
    def __init__(self, title, description, firstname, lastname, priority, deadline, emails):
        self.title = title
        self.description = description
        self.firstname = firstname
        self.lastname = lastname
        self.priority = priority
        self.deadline = deadline
        self.emails = emails

    def format_deadline(self):
        d = datetime.fromisoformat(self.deadline[:-1])
        return d.strftime('%Y-%m-%d %H:%M:%S')
        
    def build_message(self):
        message = 'Hei, det har blitt lagt til en ny oppgave. \n\n' + 'Tittel: ' + self.title + '\n' + 'Beskrivelse: ' + self.description + '\n' + 'Ansvarlig: ' + self.firstname + ' ' + self.lastname + '\n' + 'Prioritet: ' + self.priority + '\n' + 'Frist: ' + self.format_deadline() + '\n' + 'Gå til panelet for å fullføre oppgaven: https://schmell.herokuapp.com \n\nMvh Schmell :-)' 
        return message
    
    def send_mail(self):
        send_mail(
            subject = 'Ny arbeidsoppgave lagt til: ' + self.title,
            message = self.build_message(),
            from_email = FROM_EMAIL,
            recipient_list = self.emails
        )

class SendTaskDeadlineClosing():
    def __init__(self, title, description, priority, deadline, email):
        self.title = title
        self.description = description
        self.priority = priority
        self.deadline = deadline
        self.email = email
    
    def format_deadline(self):
        return self.deadline.strftime('%Y-%m-%d %H:%M:%S')

    def build_message(self):
        return 'Du har en uløst oppgave. Det er mindre enn 24 timer til fristen går ut. Vennligst fullfør oppgaven.\n'\
                'Info om oppgaven:\n'\
                'Tittel: ' + self.title + '\n'\
                'Beskrivelse: ' + self.description + '\n'\
                'Prioritet: ' + self.priority + '\n'\
                'Frist: ' + self.format_deadline() + '\n'\
                'Gå til panelet for å fullføre oppgaven: https://schmell.herokuapp.com \n\n'\
                'Mvh Schmell :-)'
    
    def send_mail(self):
        send_mail(
            subject = 'Uløst oppgave: ' + self.title,
            message = self.build_message(),
            from_email = FROM_EMAIL,
            recipient_list = [self.email]
        )

class SendGameNotUpdated():
    def __init__(self, name, description, last_updated, emails):
        self.name = name
        self.description = description
        self.last_updated = last_updated
        self.emails = emails
    
    def build_message(self):
        return 'Spillet ' + self.name + ' har ikke blitt oppdatert på 2 uker.\n'\
                'Info om spillet:\n'\
                'Navn på spill: ' + self.name + '\n'\
                'Beskrivelse: ' + self.description + '\n'\
                'Status: ' + parseStatusToString(self.status) + '\n'\
                'Sist oppdatert: ' +  str(self.last_updated) + '\n'\
                'Gå til panelet for å oppdatere: https://schmell.herokuapp.com \n\n'\
                'Mvh Schmell :-)'
    
    def send_mail(self):
        send_mail(
            subject= 'Spill ikke oppdatert på 2 uker',
            message= self.build_message(),
            from_email=FROM_EMAIL,
            recipient_list=self.emails
        )