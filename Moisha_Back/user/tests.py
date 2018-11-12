from django.forms import model_to_dict
from django.test import TestCase, Client
import json

from django.utils import timezone

from article.tag import TagColor
from interest.models import Interest, InterestTag
from .models import Department, College, User
from .serializers import UserSerializer, UserDetailSerializer




class UserTestCase(TestCase):
    def setUp(self):
        self.user = {'username': 'test@test.com','password': 'test'}
        self.notUser = {'username': 'test', 'password': 'test'}
        self.signup = {'password': 'test', 'nickName': 'signuptest',
        'email': 'signup2@test.com', 'major': 1, 'studentId': 111323294, 'name': 'testSignup'}
        college = College.objects.create(name='college')
        department = Department.objects.create(name='department',college=college)
        tagColor = TagColor.objects.create(name='color', rgb='#ffffff')
        interestTag = InterestTag.objects.create(name='tag', color=tagColor)
        user = User.objects.create_user(email='test@test.com',password='test',
        studentId=98547514, major = department, name = 'test', nickName='test')
        interest = Interest.objects.create(name='interest', createUser=user)
        interest.tags.add(interestTag)
        user.interests.add(interest)
        interest.save()
        user.save()

    def testLogIn(self):
        response = self.client.post('/user/login/', self.notUser, follow=True)
        self.assertEquals(response.status_code, 400)
        response = self.client.post('/user/login/', self.user, follow=True)
        data = json.loads(response.content.decode('utf-8'))
        self.assertEquals(data['user_name'], 'test')
        self.assertEquals(response.status_code, 200)

    def testSignUp(self):
        client = Client()
        response = self.client.post('/user/signup/', data=self.user, follow=True)
        self.assertEquals(response.status_code, 400)
        response = self.client.post('/user/signup/', data=self.signup)
        data = json.loads(response.content.decode('utf-8'))
        self.assertEquals(data['user_name'], 'testSignup')
        self.assertEquals(response.status_code, 201)

    def testGetUserInfo(self):
        response = self.client.get('/user/info/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password= 'test')
        response = self.client.get('/user/info/')
        data = json.loads(response.content.decode('utf-8'))
        self.assertEqual(data['email'],'test@test.com')
        self.assertEqual(response.status_code, 200)

    def testGetUserByInterest(self):
        response = self.client.get('/user/interest/1/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.get('/user/interest/1/')
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/user/interest/1/', {'limit': 1})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/user/interest/2/')
        self.assertEqual(response.status_code, 404)