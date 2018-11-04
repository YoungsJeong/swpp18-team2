from django.test import TestCase, Client
import json
from .models import Department, College, User
from .serializers import UserSerializer

class BlogTestCase(TestCase):
    def setUp(self):
        self.user = {'username': 'test@test.com','password': 'test'}
        self.notUser = {'username': 'test', 'password': 'test'}
        self.signup = {'password': 'test', 'nickName': 'signuptest',
        'email': 'signup@test.com', 'major': 1, 'studentId': 111323234, 'name': 'test'}
        college = College.objects.create(name='test')
        department = Department.objects.create(name='test',college=college)
        user = User.objects.create_user(email='test@test.com',password='test',
        studentId=98547514, major = department, name = 'test', nickName = 'test')
        serializer = UserSerializer(user)
        print(serializer.data)
    def testLogIn(self):
        response = self.client.post('/user/login/', self.notUser, follow=True)
        self.assertEquals(response.status_code, 400)
        response = self.client.post('/user/login/', self.user, follow=True)
        self.assertEquals(response.status_code, 200)

#Issue: Does not Work, and don't know why
    def testSignUp(self):
        response = self.client.post('/user/signup/', self.user, follow=True)
        self.assertEquals(response.status_code, 400)
        #response = self.client.post('/user/signup/', self.signup, follow=True)
        #self.assertEquals(response.status_code, 201)
