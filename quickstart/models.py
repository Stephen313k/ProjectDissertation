from django.db import models


# Create your models here.
class Student(models.Model):
    student_id = models.CharField(max_length=50)
    student_name = models.CharField(max_length=50)
    student_dob = models.CharField(max_length=50)
    student_year = models.CharField(max_length=50)
    student_school = models.CharField(max_length=50)
    
    def __str__(self):
        return self.student_name

# Create your models here.
class Teacher(models.Model):
    teacher_id = models.CharField(max_length=50)
    teacher_name = models.CharField(max_length=50)
    teacher_dob = models.CharField(max_length=50)
    teacher_year = models.CharField(max_length=50)
    teacher_school = models.CharField(max_length=50)
