from django.contrib import admin
from .models import Project, State, Ticket

admin.site.register(Project)
admin.site.register(State)
admin.site.register(Ticket)