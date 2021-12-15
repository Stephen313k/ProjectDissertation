from django.db import models
from django.utils.translation import gettext_lazy as _


class StudentInfo(models.Model):
    student_id = models.CharField(max_length=50)
    student_name = models.CharField(max_length=50)
    student_dob = models.CharField(max_length=50)
    student_year = models.CharField(max_length=50)
   # student_course = models.CharField(max_length=50)
    student_school = models.CharField(max_length=50)
    
    def __str__(self):
        return self.student_name

class TeacherInfo(models.Model):
    teacher_id = models.CharField(max_length=50)
    teacher_name = models.CharField(max_length=50)
    teacher_dob = models.CharField(max_length=50)
    teacher_dept = models.CharField(max_length=50)
    teacher_school = models.CharField(max_length=50)

#quiz tables
#many to many relationships foreign keys
class Category(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class Quizzes(models.Model):
    class Meta:
        verbose_name = _("Quiz")
        verbose_name_plural = _("Quizzes")
        ordering = ['id']

    category = models.ForeignKey(
        Category, default=1, on_delete=models.DO_NOTHING)
    date_created = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.title

class Updated(models.Model):
    date_updated = models.DateTimeField(
        verbose_name=_("Last Updated"), auto_now=True)
    #abstract method
    class Meta:
        abstract = True
        
class Question(Updated):
    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")
        ordering = ['id']
    quizzes = models.ForeignKey(
        Quizzes, related_name='question', on_delete=models.DO_NOTHING)

class Answer(Updated):
    question = models.ForeignKey(
        Question, related_name='answer', on_delete=models.DO_NOTHING)

