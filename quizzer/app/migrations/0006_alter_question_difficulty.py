# Generated by Django 3.2.9 on 2021-12-15 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20211215_1246'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='difficulty',
            field=models.IntegerField(choices=[(1, 'Beginner'), (2, 'Expert')], default=0, verbose_name='Difficulty'),
        ),
    ]