from rest_framework.settings import api_settings
from django.conf.urls import url, include
from .views import StudentViewset, firstFunction
from rest_framework.routers import DefaultRouter

app_name = 'quizzer'
#routers
router = DefaultRouter()
router.register("student_info", StudentViewset, basename='student_info')
urlpatterns = [
    url('first', firstFunction),
    url('', include(router.urls)),
]