# Generated by Django 3.2.9 on 2022-02-25 12:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classroom', '0003_auto_20220225_0352'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='syllabus',
            new_name='modules',
        ),
    ]