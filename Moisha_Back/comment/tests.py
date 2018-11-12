from django.test import TestCase, Client
import json
# Create your tests here.
from article.tag import TagColor
from interest.models import Interest, InterestTag
from user.models import Department, College, User


class CommentTestCase(TestCase):

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



