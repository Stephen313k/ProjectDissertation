# Generated by Django 4.0.3 on 2022-03-26 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('module', '0006_auto_20220325_1338'),
    ]

    operations = [
        migrations.AlterField(
            model_name='module',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
