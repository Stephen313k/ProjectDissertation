from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import serializers, viewsets
from .serializer import StudentSerializer
from app.models import StudentInfo

# function based view

@api_view()
@permission_classes([AllowAny])
def firstFunction(request):
    print(request.query_params)
    print(request.query_params['id'])
    
    #print(request.query_params['key'])
    return Response({"message": "Got some data!"})

class StudentViewset(viewsets.ModelViewSet):
    serializer_class = StudentSerializer

    def get_queryset(self):
        student_info = StudentInfo.objects.all()
        return student_info

    #display specific info (filter)
    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        print(params['pk'])
        #get student name
        students = StudentInfo.objects.filter(student_id = params['pk'])
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
