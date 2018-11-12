from django.test import TestCase, Client
from user.models import User
from interest.serializers import InterestSerializer
from article.tag import TagColor
from user.models import Department, College, User
import json
from .models import Interest, InterestTag

# Create your tests here.
class InterestTestCase(TestCase):
    def setUp(self):
        self.user = {'username': 'test@test.com', 'password': 'test'}
        self.notUser = {'username': 'test', 'password': 'test'}
        self.signup = {'password': 'test', 'nickName': 'signuptest',
                       'email': 'signup2@test.com', 'major': 1, 'studentId': 111323294, 'name': 'testSignup'}
        college = College.objects.create(name='college')
        department = Department.objects.create(name='department', college=college)
        tagColor = TagColor.objects.create(name='color', rgb='#ffffff')
        interestTag = InterestTag.objects.create(name='tag', color=tagColor)
        user = User.objects.create_user(email='test@test.com', password='test',
                                        studentId=98547514, major=department, name='test', nickName='test')
        interest = Interest.objects.create(name='interest', createUser=user)
        interest.tags.add(interestTag)
        user.interests.add(interest)
        interest.save()
        user.save()


    def testCreatInterest(self):

        response = self.client.post('/interest/create/', json.dumps({'createUser': '1','name':'test','interestTags':'[5]'
                                                        ,'detail':'asd','photoURL':''}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.post('/interest/create/', json.dumps({'createUser': 1, 'name': 'test1', 'interestTags': [5]
                                                           , 'detail': 'asd', 'photoURL': ''}),
                                content_type='application/json')
        self.assertIn('test1',response.content.decode())
        response = self.client.post('/interest/create/', json.dumps({'createUser': 1, 'name': 'test2', 'interestTags': [5]
                                                           , 'detail': 'asd', 'photoURL': 'http://image.chosun.com/sitedata/image/201804/25/2018042502074_0.jpg'}),
                               content_type='application/json')
        self.assertIn('test2', response.content.decode())

    def testGetInterestByUser(self):

        response = self.client.get('/interest/user/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.get('/interest/user/')
        self.assertIn('interest',response.content.decode())

    def testGetInteresetById(self):

        response =self.client.get('/interest/1/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.get('/interest/1/')
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/interest/2/')
        self.assertEqual(response.status_code, 404)