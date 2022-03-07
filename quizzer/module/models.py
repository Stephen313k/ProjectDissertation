from django.db import models
from django.contrib.auth.models import User

from page.models import Page

class Module(models.Model):
    title = models.CharField(max_length=150)
    user = models.ForeignKey(User, on_delete=models.Case, related_name='module_owner')
    hours = models.PositiveIntegerField()
    pages = models.ManyToManyField(Page)
    
    def __str__ (self):
        return self.title