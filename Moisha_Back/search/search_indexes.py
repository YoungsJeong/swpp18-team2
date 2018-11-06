from haystack import indexes

from interest.models import Interest
from user.models import Department


class DepartmentIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=False)
    name = indexes.CharField(model_attr='name')
    autocomplete_search = indexes.EdgeNgramField(model_attr='name')

    def get_model(self):
        return Department

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.all()


class InterestIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=False)
    name = indexes.CharField(model_attr='name')
    createdDate = indexes.DateTimeField(model_attr = 'createdDate')
    createUser = indexes.MultiValueField()
    tags = indexes.MultiValueField()
    photoURL = indexes.CharField(model_attr='photoURL', default='https://raw.githubusercontent.com/swsnu/swpp18-team2/master/Images/empty.png')
    autocomplete_search = indexes.EdgeNgramField(model_attr='name')

    def get_model(self):
        return Interest

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.all()

    def prepare_name(self, obj):
        return Interest.objects.get(id=obj.id).name

    def prepare_createUser(self, obj):
        return Interest.objects.get(id=obj.id).createUser.nickName

    def prepare_createdDate(self, obj):
        return Interest.objects.get(id=obj.id).createdDate
