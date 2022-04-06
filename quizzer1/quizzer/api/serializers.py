from rest_framework import serializers

from quizzer.models import Quizzer


class QuizzerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizzer
        fields = '__all__'