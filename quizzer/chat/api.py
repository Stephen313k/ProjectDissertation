from server.models import TextChannels, Server
from chat.models import Message
from chat.serializers import ChatSerializer

#Pagination 
from rest_framework.pagination import PageNumberPagination

#Django Rest
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

#Django 
from django.http.response import Http404

#Response Pagination UTIL: display 5 results
class ResponsePagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 5

class chatAPIList(APIView):
    permission_classes = [permissions.AllowAny,]

    def get_object(self, pk):
        try:
            return TextChannels.objects.get(pk=pk)
        except TextChannels.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):            
        #pass in pk to get the channel
        channel = self.get_object(pk)
        messages = Message.objects.filter(channel=channel).order_by('-date')
        #For pagination
        paginator = ResponsePagination()
        #pagnate all messages and requests
        results = paginator.paginate_queryset(messages, request)
        serializer = ChatSerializer(results, many=True, context={'request': request})
        #return serialized data
        return paginator.get_paginated_response(serializer.data)
    
    def post(self, request, format=None):
        serializer = ChatSerializer(data=request.data)
        #if it is correct (contains data) then save
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_4OO_BAD_REQUEST)

#decorated view for delete message api
@api_view(['DELETE'])
@permission_classes([permissions.AllowAny,])
def DeleteMessageAPI(request, pk, server_id):
    if request.method == 'DELETE':
        #if request is to delete get the server id
        server = Server.objects.get(pk=server_id)
        #check if user is moderator
        if request.user in server.moderators.all() or request.user == server.user:
            #message gets deleted
            Message.objects.get(pk=pk).delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)