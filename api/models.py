from django.db import models

class User(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    createdAt = models.DateTimeField(auto_now_add=True)

    def check_password(self, password):
        return self.password == password

    def __str__(self):
        return f"{self.firstname} {self.lastname}"

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