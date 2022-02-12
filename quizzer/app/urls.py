from django.urls import path
from .views import Quiz, RandomQuestion, QuizQuestion

app_name = 'quizzer'

urlpatterns = [
    path('', Quiz.as_view(), name='quizzer'),
    path('r/<str:topic>/', RandomQuestion.as_view(), name = 'random'),
    path('q/<str:topic>/', QuizQuestion.as_view(), name = 'questions'),

]