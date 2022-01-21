# Generated by Django 4.0.1 on 2022-01-21 19:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('schmelladmin', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('title', models.CharField(max_length=150)),
                ('description', models.CharField(max_length=500)),
                ('status', models.CharField(choices=[('P', 'Pending'), ('D', 'Doing'), ('F', 'Finished')], max_length=1)),
                ('deadline', models.DateTimeField()),
                ('category', models.CharField(choices=[('G', 'Games'), ('D', 'Development'), ('W', 'Design'), ('M', 'Marketing'), ('E', 'Economy')], max_length=1)),
                ('priority', models.IntegerField(choices=[(3, 'Low'), (2, 'Medium'), (1, 'High')])),
                ('related_game', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='schmelladmin.game')),
                ('responsible', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]