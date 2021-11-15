from django.contrib import admin
from django.db import models
from .models import Student, Teacher

admin.site.register(Student)
admin.site.register(Teacher)

#admin page
# Register your models here.
