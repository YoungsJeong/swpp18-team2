import haystack
from django.core.management import call_command
from django.test import TestCase, override_settings

# Create your tests here.
from haystack.utils.loading import ConnectionHandler
from rest_framework.utils import json

from article.models import ArticleTag, ArticleType, Article
from article.tag import TagColor
from interest.models import InterestTag, Interest
from user.models import College, Department, User

TEST_INDEX = {
    'default': {
        'ENGINE': 'haystack.backends.elasticsearch_backend.ElasticsearchSearchEngine',
        'URL': 'http://127.0.0.1:9200/',
        'TIMEOUT': 60 * 10,
        'INDEX_NAME': 'test_index',
    },
}


@override_settings(HAYSTACK_CONNECTIONS=TEST_INDEX )
class SearchTestCase(TestCase):
    def setUp(self):
        haystack.connections.reload('default')
        super(SearchTestCase, self).setUp()
        self.user = {'username': 'test@test.com', 'password': 'test'}
        self.notUser = {'username': 'test', 'password': 'test'}
        self.signup = {'password': 'test', 'nickName': 'signuptest',
                   'email': 'signup2@test.com', 'major': 1, 'studentId': 111323294, 'name': 'test'}
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
        article = Article.objects.create(title='title', author=user, content='content',
                                        interest=interest)
        articleTag = ArticleTag.objects.create(name='tag', color=tagColor)
        articleType = ArticleType.objects.create(name='type')
        article.tags.add(articleTag)
        article.type.add(articleType)
        article.save()

    def tearDown(self):
        call_command('clear_index', interactive=False, verbosity=0)

    def testSearchDepartment(self):
        response = self.client.get('/search/department/', {'q': ''})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/search/department/', {'q': 'test'})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/search/department/', {'q': 'department'})
        self.assertEqual(response.status_code, 200)

    def testSearchArticleTag(self):
        response = self.client.get('/search/article/tag/', {'q': ''})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/search/article/tag/', {'q': 'a'})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/search/article/tag/', {'q': 't'})
        self.assertEqual(response.status_code, 200)

    def testSearchInterestTag(self):
        response = self.client.get('/search/interest/tag/', {'q': ''})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/search/interest/tag/', {'q': 'q'})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/search/interest/tag/', {'q': 't'})
        self.assertEqual(response.status_code, 200)

    def testSearchInterest(self):
        response = self.client.get('/search/interest/', {'q': ''})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/search/interest/', {'q': ' '})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/search/interest/', {'q': 'interest'})
        self.assertEqual(response.status_code, 200)

    def testSearchInterestByUser(self):
        response = self.client.get('/search/interest/user/', {'q': ''})
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.get('/search/interest/user/', {'q': ''})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/search/interest/user/', {'q': 'q'})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/search/interest/user/', {'q': 'interest'})
        self.assertEqual(response.status_code, 200)