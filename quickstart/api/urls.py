from rest_framework.settings import api_settings
from django.conf.urls import url, include
from .views import firstFunction, StudentViewset
from rest_framework.routers import DefaultRouter


router = DefaultRouter
router.register('student_info', StudentViewset)

urlpatterns = [
    url('first', firstFunction),
    url('', include(router.urls))
]