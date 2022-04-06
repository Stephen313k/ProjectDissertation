
#from app.views import Signup, PasswordChange, PasswordChangeDone, EditProfile

#from django.contrib.auth import views as authViews 


#from django.urls import path, include

#from knox.views import LogoutView

#from .views import UserAPIView, RegisterAPIView, LoginAPIView

#urlpatterns = [
    #path('', include('knox.urls')),
   # path('user', UserAPIView.as_view()),
   # path('register', RegisterAPIView.as_view()),
   # path('login', LoginAPIView.as_view()),
    #path('logout', LogoutView.as_view(), name='knox_logout'),
#	path('profile/edit', EditProfile, name='edit-profile'),
   #	path('signup/', Signup, name='signup'),
   #	path('login/', authViews.LoginView.as_view(template_name='registration/login.html'), name='login'),
   #	path('logout/', authViews.LogoutView.as_view(), {'next_page' : 'index'}, name='logout'),
   #	path('changepassword/', PasswordChange, name='change_password'),
   #	path('changepassword/done', PasswordChangeDone, name='change_password_done'),
   	#path('passwordreset/', authViews.PasswordResetView.as_view(), name='password_reset'),
   #	path('passwordreset/done', authViews.PasswordResetDoneView.as_view(), name='password_reset_done'),
   #	path('passwordreset/<uidb64>/<token>/', authViews.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
   #	path('passwordreset/complete/', authViews.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
#]