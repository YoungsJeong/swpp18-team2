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
        anotherUser = User.objects.create_user(email='another@test.com', password='test',
                                               studentId=1548915, major=department, name='another', nickName='another')
        interest = Interest.objects.create(name='interest', createUser=user)
        anotherInterest = Interest.objects.create(name='interest1', createUser=anotherUser)
        anotherInterest.tags.add(interestTag)
        anotherInterest.save()
        interest.tags.add(interestTag)
        user.interests.add(interest)
        anotherInterest.save()
        anotherUser.save()
        interest.save()
        user.save()

    def testModifyUserInfo(self):
        samePayload = {'nickName': 'test', 'email': 'test@test.com', 'password': 'test'}
        invalidPayload = {'nickName': 'test', 'email': 'test@test.com', 'password': 'test1'}
        differentPayload = {'nickName': 'test1', 'email': 'test1@test.com', 'password': 'test'}
        response = self.client.put('/api/user/modify/', samePayload, content_type='application/json')
        self.assertEquals(response.status_code, 400)
        self.client.login(username='test@test.com', password= 'test')
        response = self.client.put('/api/user/modify/', samePayload, content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = self.client.put('/api/user/modify/', invalidPayload, content_type='application/json')
        self.assertEquals(response.status_code, 400)
        response = self.client.put('/api/user/modify/', differentPayload, content_type='application/json')
        self.assertEquals(response.status_code, 200)

    def testCheckDuplicate(self):
        emailDuplicate = {'email': 'test@test.com'}
        emailNotDuplicate = {'email': 'test1@test.com'}
        nickNameDuplicate = {'nickName': 'test'}
        nickNameNotDuplicate = {'nickName': 'test1'}
        studentIdDuplicate = {'studentId': '98547514'}
        studentIdNotDuplicate = {'studentId': '12345'}
        invalid = {'abcd': 'efgh'}
        self.client.login(username='test@test.com', password= 'test')
        response = self.client.get('/api/user/check/', data=emailDuplicate, content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = self.client.get('/api/user/check/', data=emailNotDuplicate, content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = self.client.get('/api/user/check/', data=nickNameDuplicate, content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = self.client.get('/api/user/check/', data=nickNameNotDuplicate, content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = self.client.get('/api/user/check/', data=studentIdDuplicate, content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = self.client.get('/api/user/check/', data=studentIdNotDuplicate, content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = self.client.get('/api/user/check/', data=invalid, content_type='application/json')
        self.assertEquals(response.status_code, 400)

    def testUpdateIntersetToUser(self):
        add = {'action': 'add'}
        delete = {'action': 'delete'}
        invalid = {'action': ''}
        response = self.client.put('/api/user/interest/1/update/')
        self.assertEquals(response.status_code, 400)
        self.client.login(username='test@test.com', password= 'test')
        response = self.client.put('/api/user/interest/1/update/', data=add, content_type='application/json')
        self.assertEquals(response.status_code, 400)
        response = self.client.put('/api/user/interest/1/update/', data=delete, content_type='application/json')
        self.assertEquals(response.status_code, 200)
        self.client.login(username='test@test.com', password='test')
        response = self.client.put('/api/user/interest/2/update/', data=delete, content_type='application/json')
        self.assertEquals(response.status_code, 400)
        response = self.client.put('/api/user/interest/2/update/', data=add, content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = self.client.put('/api/user/interest/3/update/', data=add, content_type='application/json')
        self.assertEquals(response.status_code, 404)
        response = self.client.put('/api/user/interest/4/update/', data=invalid, content_type='application/json')
        self.assertEquals(response.status_code, 400)



    def testLogIn(self):
        response = self.client.post('/api/user/login/', self.notUser, follow=True)
        self.assertEquals(response.status_code, 400)
        response = self.client.post('/api/user/login/', self.user, follow=True)
        data = json.loads(response.content.decode('utf-8'))
        self.assertEquals(data['user_name'], 'test')
        self.assertEquals(response.status_code, 200)

    def testSignUp(self):
        client = Client()
        response = self.client.post('/api/user/signup/', data=self.user, follow=True)
        self.assertEquals(response.status_code, 400)
        response = self.client.post('/api/user/signup/', data=self.signup)
        data = json.loads(response.content.decode('utf-8'))
        self.assertEquals(data['user_name'], 'testSignup')
        self.assertEquals(response.status_code, 201)

    def testGetUserInfo(self):
        response = self.client.get('/api/user/info/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password= 'test')
        response = self.client.get('/api/user/info/')
        data = json.loads(response.content.decode('utf-8'))
        self.assertEqual(data['email'],'test@test.com')
        self.assertEqual(response.status_code, 200)

    def testGetUserByInterest(self):
        response = self.client.get('/api/user/interest/1/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.get('/api/user/interest/1/')
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/user/interest/1/', {'limit': 1})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/user/interest/3/')
        self.assertEqual(response.status_code, 404)