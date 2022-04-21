from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import JSONParser
from django.http.response import Http404
from rest_framework.pagination import PageNumberPagination


#Notification models
from server.models import Server
from notification.models import Notification
from notification.serializers import NotificationSerializer


class NotificationAPI(APIView):
    permission_classes = [permissions.AllowAny,]
    
    def get_object(self, pk):
        try:
            return Notification.objects.get(pk=pk)
        except Notification.DoesNotExist:
            raise Http404
 
    #get all the notifications
    def get(self, request, format=None):
        notifications = Notification.objects.filter(to_user=request.user)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)
    
    #create a notification for server invitation ect
    def post(self, request, format=None):
        serializer = NotificationSerializer(data=request.data)
        #getting the user id, notificaton to id_user
        to_user = User.objects.get(username=request.data['to_user'])
        #getting the server id, notification to specific server
        to_server = Server.objects.get(pk=request.data['to_server'])
        if serializer.is_valid(raise_exception=True):
            serializer.save(to_user=to_user, to_server=to_server, from_user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #delete a notification
    def delete(self, request, pk, format=None):
        #get the specific notification object
        notification = self.get_object(pk=pk)
        #if this is the user accounts notification
        if request.user == notification.to_user:
            #then delete it
            notification.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

#aaccept an invitation
@api_view(['POST'])
@permission_classes([permissions.AllowAny,])
@parser_classes([JSONParser])
def acceptInvitation(request, pk):
    if request.method == 'POST':
        #get the notification id
        notification = Notification.objects.get(pk=pk)
        #get the pk by grabbing notification.server id
        server = Server.objects.get(pk=notification.to_server.id)
        #if there is a notification to user
        if request.user == notification.to_user:
            #notification type saves (accepts)
            if notification.notification_type == 1:
                server.members.add(notification.to_user)
                server.save()
                notification.delete()
            else:
                server.members.add(notification.from_user)
                server.save()
                notification.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

#request to join a server
@api_view(['POST'])
@permission_classes([permissions.AllowAny,])
@parser_classes([JSONParser])
def ReqToJoinServer(request):
    if request.method == 'POST':
        #pass the data in
        serializer = NotificationSerializer(data=request.data)
        #get the server id
        to_server = Server.objects.get(pk=request.data['to_server'])
        #get the user id
        to_user = User.objects.get(pk=to_server.user.id)
        #if the data entry is valid and contans data
        if serializer.is_valid(raise_exception=True):
            #save new data
            serializer.save(to_user=to_user, to_server=to_server, from_user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)