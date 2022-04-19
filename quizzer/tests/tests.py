#using pytest
import pytest
from pprint import pprint

#import user table 
from django.contrib.auth.models import User

##############################
#1
#Test to see if user gets created, bringing in the database
@pytest.mark.django_db
def test_user_create():
     User.objects.create_user('test', 'test@test.com', 'test')
     count = User.objects.all().count()
     print(count)
     assert User.objects.count() == 1

#list user profiles
@pytest.mark.django_db
def test_user_create1():
    #How many objects there are in the user profile
    count = User.objects.all().count()
    print(count)
    assert count == 0

###############################
#2
#fixture bring in database
import pytest

#Arranging the data, create a new user
@pytest.fixture()
def user_1(db):
    return User.objects.create_user("test-user")

#Action: set the password for the user
@pytest.mark.django_db
def test_set_check_password(user_1):
     user_1.set_password("new-password")
     #assert: test it
     assert user_1.check_password("new-password") is True

def test_set_check_password1(user_1):
    print('check-user1')
    assert user_1.username == "test-user"

def test_set_check_password2(user_1):
     print('check-user2')
     assert user_1.username == "test-user"

""""" FAILS
def test_server(db, server_factory):
    #create a server
    server = server_factory.build()
    #print server description
    print(server.title)
    assert True
"""""