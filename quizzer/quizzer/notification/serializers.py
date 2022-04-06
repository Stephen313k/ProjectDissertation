from rest_framework import serializers
from notification.models import Notification

#use authy and server serializers
from authy.serializers import UserSerializer
from server.serializers import ServerSerializer

class NotificationSerializer(serializers.ModelSerializer):
    #read only
    to_user = UserSerializer(read_only=True)
    from_user = UserSerializer(read_only=True)
    to_server = ServerSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'
        depth = 1