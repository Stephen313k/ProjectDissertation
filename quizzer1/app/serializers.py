from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Profile

from django.contrib.auth import authenticate
#Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

#User Serializer
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        exclude = (
            'password', 'last_login', 'is_superuser', 'is_staff',
            'is_active', 'date_joined', 'groups', 'user_permissions'
        )

#Signup Serializer
class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


"""""
from rest_framework import serializers
from quiz.models import Question, Quizzes, Answer

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
    """""