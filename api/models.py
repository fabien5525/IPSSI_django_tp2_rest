from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class Project(models.Model):
    name = models.CharField(max_length=100)
    alias = models.CharField(max_length=50)
    description = models.TextField()
    leader = models.ForeignKey(User, on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='projects')
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class State(models.Model):
    name = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Ticket(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)