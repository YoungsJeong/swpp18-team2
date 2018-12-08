import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditFormComponent } from './article-edit-form.component';
import {Article, ArticleTag, ArticleType, FeedService, TagColor} from '../../core/feed.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {Interest, InterestTag} from '../../core/interest.service';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';

const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor, noShow: false}
]
const mockType: ArticleType = {id: 1, name: 'testType'}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor, noShow: false}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]
const mockArticle: Article[] = [
  {id: 1, title: 'testTitle', interest: mockInterest[0],  content: 'testContent', author: 'test', type: mockType, tags: mockTag}
]
describe('ArticleEditFormComponent', () => {
  let component: ArticleEditFormComponent;
  let fixture: ComponentFixture<ArticleEditFormComponent>;
  let feedService: jasmine.SpyObj<FeedService>;

  beforeEach(async(() => {
    const feedSpy = jasmine.createSpyObj('FeedService', ['searchTag'])
    TestBed.configureTestingModule({
      imports: [NgbModule.forRoot(),
        HttpClientModule,
        SharedModule],
      providers: [{provide: FeedService, useValue: feedSpy}],
      declarations: [ ArticleEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEditFormComponent);
    component = fixture.componentInstance;
    feedService = TestBed.get(FeedService)
    component.article = mockArticle[0]
    fixture.detectChanges();
  });

  it('should create/ get interest with interest id', () => {
    fixture.detectChanges();
    component.article = mockArticle[0]
    expect(component).toBeTruthy();
    expect(component.selectedInterests.length).toEqual(1)
    expect(component.interestIDs.length).toEqual(1)
  })
  it('test validator', () => {
    component.formArticleTag.setValue({id: 1, name: 'test'})
    expect(component.formArticleTag.valid).toBeTruthy()
    component.formArticleTag.setValue({name: 'test'})
    expect(component.formArticleTag.errors.invalidArticleTag).toBeTruthy()

    let exceedString = ''
    for(let i =0; i < 8; i++)
      exceedString += '0123456789'
    component.formTitle.setValue(exceedString)
    expect(component.formTitle.valid).toBeTruthy()
    exceedString += '0'
    component.formTitle.setValue(exceedString)
    expect(component.formTitle.errors.invalidTitle).toBeTruthy()

    exceedString = ''
    for(let i =0; i < 140; i++)
      exceedString += '0123456789'
    component.formContent.setValue(exceedString)
    expect(component.formContent.valid).toBeTruthy()
    exceedString += '0'
    component.formContent.setValue(exceedString)
    expect(component.formContent.errors.invalidContent).toBeTruthy()
  });
  it('should be able to remove article tag', () => {
    fixture.detectChanges();
    component.selectedArticleTags = mockTag
    component.removeArticleTag(mockTag[0])
    expect(component.selectedArticleTags.length).toEqual(0)
  });
  it('should be able to emit payload', () => {
    fixture.detectChanges();
    const payload = {
      author: null,
      articleId: 1,
      interest: 1,
      articleTags: [],
      title: 'test',
      content: 'test'
    }
    component.formTitle.setValue('test')
    component.formContent.setValue('test')
    component.interestIDs = [1]
    component.articleTagIDs = []
    component.confirm.subscribe((result) => {
      expect(result).toEqual(payload)
    })
    component.confirmArticle()
  });
});
