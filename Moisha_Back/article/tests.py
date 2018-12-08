from django.test import TestCase, Client
import json
# Create your tests here.
from article.tag import TagColor
from interest.models import Interest, InterestTag
from user.models import Department, College, User
from article.models import ArticleTag, Article, ArticleType
from django.forms import model_to_dict

# Create your tests here.

class ArticleTestCase(TestCase):

    def setUp(self):
        self.user = {'username': 'test@test.com', 'password': 'test'}
        self.notUser = {'username': 'test', 'password': 'test'}
        self.signup = {'password': 'test', 'nickName': 'signuptest',
                       'email': 'signup2@test.com', 'major': 1, 'studentId': 111323294, 'name': 'testSignup'}
        college = College.objects.create(name='college')
        department = Department.objects.create(name='department', college=college)
        tagColor = TagColor.objects.create(name='color', rgb='#ffffff')
        interestTag = InterestTag.objects.create(name='tag', color=tagColor)
        articleTag = ArticleTag.objects.create(name='tag', color=tagColor)
        articleType = ArticleType.objects.create(name='type')
        user = User.objects.create_user(email='test@test.com', password='test',
                                        studentId=98547514, major=department, name='test', nickName='test')
        anotherUser = User.objects.create_user(email='another@test.com', password='test',
                                               studentId=1548915, major=department, name='another', nickName='another')
        interest = Interest.objects.create(name='interest', createUser=user)
        interest.tags.add(interestTag)
        article = Article.objects.create(title='aTitle', author=user, content='aContent', interest=interest)
        anotherArticle = Article.objects.create(title='aTitle', author=anotherUser, content='aContent', interest=interest)
        article.type.add(articleType)
        article.tags.add(articleTag)
        user.interests.add(interest)
        interest.save()
        user.save()
        article.save()
        anotherArticle.save()

    def testGetArticleByUser(self):
        response=self.client.get('/api/article/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response=self.client.get('/api/article/')
        self.assertEqual(response.status_code,200)
        response=self.client.get('/api/article/',{'limit': 1})
        self.assertEqual(response.status_code,200)

    def testGetArticleByUserByTag(self):
        response=self.client.get('/api/article/tags/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response=self.client.get('/api/article/tags/',{'limit': 1, 'tags': '1'})
        self.assertEqual(response.status_code,200)
        response = self.client.get('/api/article/tags/', {'tags': '1'})
        self.assertEqual(response.status_code, 200)
        response=self.client.get('/api/article/tags/',{'limit': 1})
        self.assertEqual(response.status_code,404)

    def testEditArticle(self):
        validData = json.dumps({'author':1, 'interest':[1], 'articleTags':[1], 'title':'title', 'content':'content'})
        response = self.client.put('/api/article/1/edit/', validData, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.put('/api/article/1/edit/', validData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response = self.client.put('/api/article/100/edit/', validData, content_type='application/json')
        self.assertEqual(response.status_code, 404)
        response = self.client.put('/api/article/2/edit/', validData, content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def testCreateArticle(self):
        validData = json.dumps({'author':1, 'interest':[1], 'articleTags':[1], 'title':'title', 'content':'content'})
        invalidData = json.dumps({'author':1, 'interest':[1], 'articleTags':[1], 'content':'content'})
        response = self.client.post('/api/article/create/', validData, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.post('/api/article/create/', validData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response = self.client.post('/api/article/create/', invalidData, content_type='application/json')
        self.assertEqual(response.status_code, 400)


    def testArticleTags(self):
        response = self.client.get('/api/article/tag/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.get('/api/article/tag/')
        self.assertEqual(response.status_code, 200)


    def testGetCommentByArticle(self):
        response = self.client.get('/api/article/1/comment/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.get('/api/article/1/comment/')
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/article/3/comment/')
        self.assertEqual(response.status_code, 404)


    def testGetArticleById(self):
        response = self.client.get('/api/article/1/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.get('/api/article/1/')
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/article/3/')
        self.assertEqual(response.status_code, 404)

    def testDeleteArticle(self):
        response = self.client.delete('/api/article/1/delete/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.delete('/api/article/1/delete/')
        self.assertEqual(response.status_code, 200)
        response = self.client.delete('/api/article/3/delete/')
        self.assertEqual(response.status_code, 404)
        response = self.client.delete('/api/article/2/delete/')
        self.assertEqual(response.status_code, 401)


    def testGetArticlesByInterest(self):
        response = self.client.get('/api/article/interest/1/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.get('/api/article/interest/1/')
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/article/interest/1/', {'limit': 1})
        self.assertEqual(response.status_code, 200)


    def testGetArticlesByInterestByTag(self):
        response = self.client.get('/api/article/interest/1/tags/')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.get('/api/article/interest/1/tags/', {})
        self.assertEqual(response.status_code, 404)
        response = self.client.get('/api/article/interest/1/tags/', {'tags': '1'})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/article/interest/1/tags/', {'tags': '1', 'limit': 1})
        self.assertEqual(response.status_code, 200)

