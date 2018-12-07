import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestFeedComponent } from './interest-feed.component';
import {Component, Input} from '@angular/core';
import {Article, ArticleTag, ArticleType, FeedService, TagColor} from '../../core/feed.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';


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

const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor}
]
const mockType: ArticleType = {id: 1, name: 'testType'}
const mockArticle: Article[] = [
  {id: 1, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag}
]
const mockArticles: Article[] = [
  {id: 1, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag},
  {id: 2, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag}
]
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]
describe('InterestFeedComponent', () => {
  let component: InterestFeedComponent;
  let fixture: ComponentFixture<InterestFeedComponent>;
  let feedService: jasmine.SpyObj<FeedService>;
  let interestService: jasmine.SpyObj<InterestService>;
  beforeEach(async(() => {
    const feedSpy = jasmine.createSpyObj('FeedService', ['getArticleByInterest'])
    const interestSpy = jasmine.createSpyObj('InterestService', ['getInterestByID', 'getInterestRecommendationById'])
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{provide: FeedService, useValue: feedSpy},
        {provide: InterestService, useValue: interestSpy},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        }
      ],
      declarations: [ InterestFeedComponent, MockFilterComponent, MockFeedListComponent, MockInterestListComponent  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestFeedComponent);
    component = fixture.componentInstance;
    component.interestID = 1
    feedService = TestBed.get(FeedService)
    feedService.getArticleByInterest.and.returnValue(of(mockArticle))
    interestService = TestBed.get(InterestService)
    interestService.getInterestRecommendationById.and.returnValue(of(mockInterest))
    interestService.getInterestByID.and.returnValue(of(mockInterest))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    feedService.getArticleByInterest.and.returnValue(of(mockArticles))
    component.ngOnInit()
    expect(component).toBeTruthy();
  });
  it('should be able to fetch more articles', () => {
    feedService.getArticleByInterest.and.returnValue(of(mockArticles))
    component.fetchMoreFeed()
    expect(component.articles).toEqual(mockArticles)
  });
});
