from rest_framework import serializers
from .models import Project, State, Ticket
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, data):
        user = User.objects.create(username=data['username'], email=data['email'], password=data['password'])
        user.set_password(data['password'])
        return user

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'alias', 'description', 'leader', 'users', 'createdAt']

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['id', 'name', 'createdAt']

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id', 'title', 'description', 'state', 'createdAt']
