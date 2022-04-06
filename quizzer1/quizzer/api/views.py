from rest_framework import viewsets

from .serializers import QuizzerSerializer
from quizzer.models import Quizzer


class QuizzerViewSet(viewsets.ModelViewSet):
    queryset = Quizzer.objects.all()
    serializer_class = QuizzerSerializer