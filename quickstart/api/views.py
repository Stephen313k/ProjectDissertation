from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import viewsets
from .serializer import StudentSerializer
from quickstart.models import Student

# function based view

@api_view()
@permission_classes([AllowAny])
def firstFunction(request):
    print(request.query_params)
    print(request.query_params['id'])
    print(request.query_params['key'])
    return Response({"message": "Got some data!", "data": request.data})

class StudentViewset(viewsets.ModelViewSet):
    serializer_class = StudentSerializer

    def get_queryset(self):
        student_info = Student.objects.all()
        return student_info

