# Generated by Django 4.0 on 2022-01-15 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schmelladmin', '0004_alter_game_description_alter_game_last_updated_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='related_question',
            field=models.IntegerField(blank=True),
        ),
    ]
