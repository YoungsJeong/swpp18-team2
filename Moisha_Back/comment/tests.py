from django.test import TestCase, Client
import json
# Create your tests here.
from article.tag import TagColor
from interest.models import Interest, InterestTag
from user.models import Department, College, User
from article.models import Article, ArticleType, ArticleTag
from comment.models import Comment


class CommentTestCase(TestCase):

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
        interest = Interest.objects.create(name='interest', createUser=user)
        interest.tags.add(interestTag)
        article = Article.objects.create(title='aTitle', author=user, content='aContent', interest=interest)
        comment = Comment.objects.create(author=user, article=article, comment = None, content='cContent')
        article.type.add(articleType)
        article.tags.add(articleTag)
        user.interests.add(interest)
        interest.save()
        user.save()
        article.save()
        comment.save()

    def testCreateComment(self):
        data = json.dumps({'author': 1, 'article': 1, 'comment': 'comment', 'content': 'content'})
        response = self.client.post('/comment/', data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.post('/comment/', data, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def testEditComment(self):
        data = json.dumps({'author': 1, 'article': 1, 'comment': 'comment', 'content': 'content'})
        response = self.client.put('/comment/1/', data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.client.login(username='test@test.com', password='test')
        response = self.client.put('/comment/1/', data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response = self.client.delete('/comment/1/', data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
