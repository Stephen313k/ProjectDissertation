from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import Quizzes, Question
from .serializers import QuizSerializer, QuestionSerializer, RandomQuestionSerializer
from rest_framework.views import APIView

class Quiz(generics.ListAPIView):
    #data from table quizzes
    serializer_class = QuizSerializer
    queryset = Quizzes.objects.all()

#kwargs
class RandomQuestion(APIView):
    def get(self, request, format=None, **kwargs ):
        #random order filter using kwargs
        question = Question.objects.filter(quiz__title=kwargs['topic']).order_by('?')[:1]
        serializer = RandomQuestionSerializer(question, many = True)
        return Response(serializer.data)

class QuizQuestion(APIView):
    def get(self, request, format=None, **kwargs ):
        #random order filter using kwargs
        quiz = Question.objects.filter(quiz__title=kwargs['topic'])
        serializer = QuestionSerializer(quiz, many = True)
        return Response(serializer.data)
