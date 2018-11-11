import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestFeedComponent } from './interest-feed.component';
import {Component, Input} from '@angular/core';
import {Article, ArticleTag, ArticleType, FeedService, TagColor} from '../../core/feed.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {ActivatedRoute, convertToParamMap} from '@angular/router';


@Component({selector: 'app-filter', template: ''})
class MockFilterComponent {
  @Input() tags: ArticleTag[]
}

@Component({selector: 'app-feed-list', template: ''})
class MockFeedListComponent {
  @Input() articles: Article[]
}

const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor},
]
const mockType: ArticleType = {id: 1, name: 'testType'}
const mockArticle: Article[] = [
  {id: 1, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag}
]

describe('InterestFeedComponent', () => {
  let component: InterestFeedComponent;
  let fixture: ComponentFixture<InterestFeedComponent>;
  let feedService: jasmine.SpyObj<FeedService>;

  beforeEach(async(() => {
    const feedSpy = jasmine.createSpyObj('FeedService', ['getArticleByInterest'])

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{provide: FeedService, useValue: feedSpy},
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
      declarations: [ InterestFeedComponent, MockFilterComponent, MockFeedListComponent  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestFeedComponent);
    component = fixture.componentInstance;
    component.interestID = 1
    feedService = TestBed.get(FeedService)
    feedService.getArticleByInterest.and.returnValue(of(mockArticle))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
