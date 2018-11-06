from haystack import indexes
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