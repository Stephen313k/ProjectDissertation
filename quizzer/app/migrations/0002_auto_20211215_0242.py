# Generated by Django 3.2.10 on 2021-12-15 02:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Student',
            new_name='StudentInfo',
        ),
        migrations.RenameModel(
            old_name='Teacher',
            new_name='TeacherInfo',
        ),
        migrations.RemoveField(
            model_name='teacherinfo',
            name='teacher_year',
        ),
        migrations.AddField(
            model_name='teacherinfo',
            name='teacher_dept',
            field=models.CharField(default=3, max_length=50),
            preserve_default=False,
        ),
    ]
