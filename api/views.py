from rest_framework import viewsets
from .models import  Project, State, Ticket
from .serializers import ProjectSerializer, StateSerializer, TicketSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated, IsAdminUser

@permission_classes([IsAdminUser])
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@permission_classes([IsAuthenticated])
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

@permission_classes([IsAuthenticated])
class StateViewSet(viewsets.ModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer

@permission_classes([IsAuthenticated])
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

@permission_classes([AllowAny])
class register_view(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        password = request.data['password']
        if serializer.is_valid():
            # hash password
            serializer.validated_data['password'] = make_password(password)
            serializer.save()
            user = User.objects.get(username=serializer.data['username'])
            token, _ = Token.objects.get_or_create(user=user)
            data = serializer.data.copy()
            data.pop('password', None)
            return Response({'data' : data, 'token': str(token)}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@permission_classes([AllowAny])
class login_view(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.get(username=username)
        if user.check_password(password):
            token, _ = Token.objects.get_or_create(user=user)
            data = UserSerializer(user).data.copy()
            data.pop('password', None)
            return Response({'data' : data, 'token': str(token)}, status=status.HTTP_200_OK)
        return Response({'error': 'Wrong credentials'}, status=status.HTTP_400_BAD_REQUEST)