from datetime import datetime
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from authmanager.models import User
from jobmanager.jobs import DeadlineJob
from mailmanager.sender import SendTaskCreatedMail
from taskmanager.helpers import switchSort
from schmelladmin.pagination import CustomPagination
from taskmanager.models import Comment, Task
from taskmanager.serializer import CommentSerializer, TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Task.objects.all()  

        sort = self.request.query_params.get('sort')
        status = self.request.query_params.get('status')
        priority = self.request.query_params.get('priority')
        responsible = self.request.query_params.get('responsible')
        deadline = self.request.query_params.get('deadline')

        if sort is not None:
            queryset = switchSort(queryset, sort)
        if status is not None:
            queryset = queryset.filter(status = status)
        if priority is not None:
            queryset = queryset.filter(priority = priority)
        if responsible is not None:
            queryset = queryset.filter(responsible = responsible)
        if deadline is not None:
            queryset = queryset.filter(deadline = deadline)
        if filter == 'ONLY_ACT':
            queryset = queryset.exclude(status = 'F')
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()
        want_alert = User.objects.filter(is_alert = True)
        emails = []

        for user in want_alert:
            emails.append(user.email)

        sender = SendTaskCreatedMail(
                serializer.data['title'], serializer.data['description'], 
                serializer.data['responsible']['first_name'],
                serializer.data['responsible']['last_name'], 
                serializer.data['priority'], serializer.data['deadline'],
                emails
        )
        if (len(emails) > 0):
            print()
            sender.send_mail()
        
        job = DeadlineJob(serializer.data['id'], serializer.data['deadline'])
        job.alert()
        job.set_deadline().apply_async(countdown=job.get_seconds_of_delay())

class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all()
        related_task = self.request.query_params.get('task')
        if related_task is not None:
            queryset = queryset.filter(related_task = related_task) 
            queryset = queryset.order_by('date')
        
        return queryset