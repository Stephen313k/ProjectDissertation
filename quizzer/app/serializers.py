from rest_framework import serializers
from .models import Question, Quizzes, Answer

#connect with view
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizzes
        #collect title push to front end
        fields = [
            'title',
        ]

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Answer
        #collect title push to front end
        fields = [
            'id',
            'answer_text',
            'is_right',
        ]
        
class RandomQuestionSerializer(serializers.ModelSerializer):
    
    answer = AnswerSerializer(many = True, read_only = True)

    class Meta:
        model = Question
        fields = ['title', 'answer',]

class QuestionSerializer(serializers.ModelSerializer):
    
    answer = AnswerSerializer(many = True, read_only = True)
    quiz = QuizSerializer(read_only = True)

    class Meta:
        model = Question
        fields = ['quiz','title', 'answer',]