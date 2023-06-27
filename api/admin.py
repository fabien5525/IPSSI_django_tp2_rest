from django.contrib import admin
from .models import User, Project, State, Ticket

admin.site.register(User)
admin.site.register(Project)
admin.site.register(State)
admin.site.register(Ticket)