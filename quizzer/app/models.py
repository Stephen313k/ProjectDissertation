from django.db import models
from django.utils.translation import gettext_lazy as _


class StudentInfo(models.Model):
    class Meta:
        verbose_name = _("Student Info")
        verbose_name_plural = _("Student Information")

    student_id = models.CharField(max_length=50)
    student_name = models.CharField(max_length=50)
    student_dob = models.CharField(max_length=50)
    student_year = models.CharField(max_length=50)
   # student_course = models.CharField(max_length=50)
    student_school = models.CharField(max_length=50)
    
    def __str__(self):
        return self.student_id

class TeacherInfo(models.Model):
    teacher_id = models.CharField(max_length=50)
    teacher_name = models.CharField(max_length=50)
    teacher_dob = models.CharField(max_length=50)
    teacher_dept = models.CharField(max_length=50)
    teacher_school = models.CharField(max_length=50)

    def __str__(self):
        return self.teacher_id

class Category(models.Model):
    name = models.CharField(max_length=255, default="String")

    def __str__(self):
        return self.name


class Quizzes(models.Model):

    class Meta:
        verbose_name = _("Quiz")
        verbose_name_plural = _("Quizzes")
        ordering = ['id']

    title = models.CharField(max_length=255, default=_(
        "New Quiz"), verbose_name=_("Quiz Title"))
    category = models.ForeignKey(
        Category, default=1, on_delete=models.DO_NOTHING)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Updated(models.Model):

    date_updated = models.DateTimeField(
        verbose_name=_("Last Updated"), auto_now=True)

    class Meta:
        abstract = True


class Question(Updated):

    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")
        ordering = ['id']

    SCALE = (
        (1, _('Beginner')),
        (2, _('Expert'))
    )

    TYPE = (
        (0, _('Multiple Choice')),
    )

    quiz = models.ForeignKey(
        Quizzes, related_name='question', on_delete=models.DO_NOTHING)
    technique = models.IntegerField(
        choices=TYPE, default=0, verbose_name=_("Type of Question"))
    title = models.CharField(max_length=255, verbose_name=_("Title"))
    difficulty = models.IntegerField(
        choices=SCALE, default=0, verbose_name=_("Difficulty"))
    date_created = models.DateTimeField(
        auto_now_add=True, verbose_name=_("Date Created"))
    is_active = models.BooleanField(
        default=False, verbose_name=_("Active Status"))

    def __str__(self):
        return self.title


class Answer(Updated):

    class Meta:
        verbose_name = _("Answer")
        verbose_name_plural = _("Answers")
        ordering = ['id']

    question = models.ForeignKey(
        Question, related_name='answer', on_delete=models.DO_NOTHING)
    answer_text = models.CharField(
        max_length=255, verbose_name=_("Answer Text"), default="String")
    is_right = models.BooleanField(default=False)

    def __str__(self):
        return self.answer_text