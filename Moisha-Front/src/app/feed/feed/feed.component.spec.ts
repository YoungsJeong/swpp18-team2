import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import {Component, Input} from '@angular/core';
import {Article, ArticleTag, ArticleType, FeedService, TagColor} from '../../core/feed.service';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';


const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor, noShow: false},
]
const mockType: ArticleType = {id: 1, name: 'testType'}
const mockArticle: Article[] = [
  {id: 1, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag},

]

@Component({selector: 'app-filter', template: ''})
class MockFilterComponent {
  @Input() tags: ArticleTag[]
}

@Component({selector: 'app-feed-list', template: ''})
class MockFeedListComponent {
  @Input() articles: Article[]
}
@Component({selector: 'app-interest-list', template: ''})
class MockInterestListComponent {
  @Input() interests: Interest[]
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor, noShow: false}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]
describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let feedService: jasmine.SpyObj<FeedService>;
  let interestService: jasmine.SpyObj<InterestService>;

  beforeEach(async(() => {
    const feedSpy = jasmine.createSpyObj('FeedService',
      ['getArticleByUser','getArticleByUserByTag', 'getArticleTags']);
    const interestSpy = jasmine.createSpyObj('InterestService',
      ['getInterestRecommendation']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{provide: FeedService, useValue: feedSpy},{provide: InterestService, useValue: interestSpy}],
      declarations: [ FeedComponent, MockFilterComponent, MockFeedListComponent, MockInterestListComponent ]
    }).compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    feedService = TestBed.get(FeedService);
    feedService.getArticleByUser.and.returnValue(of(mockArticle))
    feedService.getArticleByUserByTag.and.returnValue(of(mockArticle))
    feedService.getArticleTags.and.returnValue(of(mockTag))
    interestService = TestBed.get(InterestService)
    interestService.getInterestRecommendation.and.returnValue(of(mockInterest))
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
  it('should be able to fetch more articles', async(() => {
    component.fetchMoreFeed()
    expect(feedService.getArticleByUser).toHaveBeenCalled()
  }));
  it('should be able to fetch recommended interests', async(() => {
    component.fetchMoreFeed()
    expect(interestService.getInterestRecommendation).toHaveBeenCalled()
  }));
});
