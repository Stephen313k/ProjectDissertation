from rest_framework import serializers
from app.models import StudentInfo

class StudentSerializer(serializers.ModelSerializer):
    #collect data and send to front end
    class Meta:
        model = StudentInfo
        fields = ['student_id', 'student_name', 'student_dob', 'student_year', 'student_school']