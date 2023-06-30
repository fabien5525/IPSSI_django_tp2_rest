from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from api.views import ProjectViewSet, StateViewSet, TicketViewSet, UserViewSet, login_view, register_view

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'states', StateViewSet)
router.register(r'tickets', TicketViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="API",
        default_version='v1',
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/login/', login_view.as_view(), name='login'),
    path('api/register/', register_view.as_view(), name='register'),
]