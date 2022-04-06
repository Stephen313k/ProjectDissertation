from rest_framework import routers

from .views import QuizzerViewSet

router = routers.DefaultRouter()
router.register('quizzer', QuizzerViewSet, 'quizzer')

urlpatterns = router.urls