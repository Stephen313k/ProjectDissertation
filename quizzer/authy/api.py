#Django User
from django.contrib.auth import login

#Authy app
from authy.serializers import SignupSerializer, UserSerializer
from django.views.decorators.csrf import csrf_exempt

#Knox app
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView

#Django REst
from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.serializers import AuthTokenSerializer
#api view for signing up
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def SignupAPI(request):
    if request.method == 'POST':
        serializer = SignupSerializer(data=request.data)            
        #verify data and create user
        if serializer.is_valid():            
            user = serializer.save()
            token = AuthToken.objects.create(user)
            #return the user and the sign in token
            return Response({
                'user': serializer.data,
                'status': status.HTTP_201_CREATED,
                'token': token
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)
    @csrf_exempt
    def post(self, request, format=None):
        #request serializer
        serializer = AuthTokenSerializer(data=request.data)
        #login 
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)

#user view api
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user