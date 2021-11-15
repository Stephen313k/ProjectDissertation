from rest_framework import serializers
from quickstart.models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'student_name', 'student_dob', 'student_year', 'student_school']
