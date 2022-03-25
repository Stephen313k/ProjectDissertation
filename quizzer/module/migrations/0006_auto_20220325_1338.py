# Generated by Django 3.0.2 on 2022-03-25 13:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0002_auto_20220307_1435'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('module', '0005_module_pages'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='quizzes',
            field=models.ManyToManyField(to='quiz.Quizzes'),
        ),
        migrations.AlterField(
            model_name='module',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='module_owner', to=settings.AUTH_USER_MODEL),
        ),
    ]
