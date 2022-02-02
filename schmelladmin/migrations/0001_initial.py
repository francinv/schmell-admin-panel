# Generated by Django 4.0.1 on 2022-02-02 10:37

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('mobile_number', models.IntegerField(blank=True, null=True)),
                ('alerts_task', models.BooleanField(blank=True, default=True)),
                ('alerts_deadlines', models.BooleanField(blank=True, default=True)),
                ('profile_picture', models.ImageField(blank=True, upload_to='profile-pictures/')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200)),
                ('description', models.CharField(blank=True, max_length=500)),
                ('related_questions', models.BooleanField(blank=True, default=False)),
                ('last_updated', models.DateField(blank=True)),
                ('status', models.CharField(blank=True, choices=[('D', 'Development'), ('R', 'Ready'), ('P', 'Deployed')], max_length=1)),
                ('logo', models.ImageField(blank=True, upload_to='game-pictures/')),
                ('release_date', models.DateTimeField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Week',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('week_number', models.CharField(choices=[(1, 'Week 1'), (2, 'Week 2'), (3, 'Week 3'), (4, 'Week 4'), (5, 'Week 5'), (6, 'Week 6'), (7, 'Week 7'), (8, 'Week 8'), (9, 'Week 9'), (10, 'Week 10'), (11, 'Week 11'), (12, 'Week 12'), (13, 'Week 13'), (14, 'Week 14'), (15, 'Week 15'), (16, 'Week 16'), (17, 'Week 17'), (18, 'Week 18'), (19, 'Week 19'), (20, 'Week 20'), (21, 'Week 21'), (22, 'Week 22'), (23, 'Week 23'), (24, 'Week 24'), (25, 'Week 25'), (26, 'Week 26'), (27, 'Week 27'), (28, 'Week 28'), (29, 'Week 29'), (30, 'Week 30'), (31, 'Week 31'), (32, 'Week 32'), (33, 'Week 33'), (34, 'Week 34'), (35, 'Week 35'), (36, 'Week 36'), (37, 'Week 37'), (38, 'Week 38'), (39, 'Week 39'), (40, 'Week 40'), (41, 'Week 41'), (42, 'Week 42'), (43, 'Week 43'), (44, 'Week 44'), (45, 'Week 45'), (46, 'Week 46'), (47, 'Week 47'), (48, 'Week 48'), (49, 'Week 49'), (50, 'Week 50'), (51, 'Week 51'), (52, 'Week 52')], max_length=2)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schmelladmin.game')),
            ],
        ),
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
                ('updated', models.DateTimeField(auto_now=True)),
                ('related_game', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='schmelladmin.game')),
                ('responsible', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=200)),
                ('question_desc', models.CharField(max_length=500)),
                ('hint', models.CharField(max_length=500)),
                ('related_question', models.IntegerField(blank=True)),
                ('phase', models.IntegerField()),
                ('function', models.CharField(blank=True, max_length=200)),
                ('punishment', models.CharField(default='2 slurker', max_length=200)),
                ('related_game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schmelladmin.game')),
                ('related_week', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='schmelladmin.week')),
            ],
        ),
        migrations.CreateModel(
            name='Idea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=250)),
                ('category', models.CharField(choices=[('G', 'Games'), ('D', 'Development'), ('W', 'Design'), ('E', 'Various')], max_length=1)),
                ('createdBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('comment', models.CharField(max_length=500)),
                ('related_task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schmelladmin.task')),
                ('written_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
