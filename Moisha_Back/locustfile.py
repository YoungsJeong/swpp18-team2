from locust import task, TaskSet, HttpLocust
from rest_framework.utils import json


class LoadTask(TaskSet):
    def on_start(self):
        response = self.client.post('api/user/login/',{
            'username': 'admin@admin.com',
            'password': 'Qwe12345'
        })
        data = json.loads(response.content.decode('utf-8'))
        self.token = data['token']
        self.client.headers['Authorization'] = 'token ' + self.token

    def on_stop(self):
        pass

    @task
    def getArticleByUser(self):
        self.client.headers['token'] = self.token
        self.client.get('api/article/?limit=5')

    @task
    def getArticlesByUserByTag(self):
        self.client.get('api/article/tags/?tags=3,4,5,6&limit=5&')

    @task
    def getArticleById(self):
        self.client.get('api/article/24/')

    @task
    def getCommentsByArticle(self):
        self.client.get('api/article/24/comment/')

    @task
    def getArticlesByInterest(self):
        self.client.get('api/article/interest/46/?limit=5')

    @task
    def getArticlesByInterestByTag(self):
        self.client.get('api/article/interest/46/tags/?tags=3,4,5,6&limit=5')

    @task
    def getArticleTags(self):
        self.client.get('api/article/tag/')

    @task
    def getArticleTags(self):
        self.client.get('api/article/tag/')

    @task
    def getInterestByID(self):
        self.client.get('api/interest/46/')

    @task
    def getGetInterestTags(self):
        self.client.get('api/interest/tags/')

    @task
    def getInterestsByUser(self):
        self.client.get('api/interest/user/')

    @task
    def getInterestRecommendation(self):
        self.client.get('api/interest/recommend/')

    @task
    def getInterestRecommendationByTag(self):
        self.client.get('api/interest/recommend/tag/?tags=6,7,8,9,10&limit=5&')

    @task
    def getInterestRecommendationByInterest(self):
        self.client.get('api/interest/recommend/46/')

    @task
    def searchDepartment(self):
        self.client.get('api/search/department/?q=컴')

    @task
    def searchInterest(self):
        self.client.get('api/search/interest/?q=')

    @task
    def searchInterestByTag(self):
        self.client.get('api/search/interest/tag/?q=6,7,8,9,10&limit=5')

    @task
    def searchInterestByUser(self):
        self.client.get('api/search/interest/user/?q=')

    @task
    def searchInterestTag(self):
        self.client.get('api/search/interesttag/?q=')

    @task
    def searchArticleTag(self):
        self.client.get('api/search/articletag/?q=')

    @task
    def checkDuplicate(self):
        self.client.get('api/user/check/?email=admin@admin.com')

    @task
    def getUserInfo(self):
        self.client.get('api/user/info/')

    @task
    def getUserByInterest(self):
        self.client.get('api/user/interest/46/?limit=5&')

class WebsiteUser(HttpLocust):
    task_set = LoadTask
    min_wait = 3000
    max_wait = 15000
