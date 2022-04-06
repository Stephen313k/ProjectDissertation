"""""
from django.urls import path
from app.api import SignupAPI, LoginAPI, UserAPI

from knox import views as knox_views

urlpatterns = [
    path('app/signup', SignupAPI, name='api-app-signup'),
    path('app/login', LoginAPI.as_view(), name='knox_login'),
    path('app/whoami', UserAPI.as_view(), name='api-who-am-i'),
    path('app/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('app/logoutall', knox_views.LogoutAllView.as_view(), name="knox_logout"),

]"""