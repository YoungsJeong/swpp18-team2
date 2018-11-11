import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import {Component, Input} from '@angular/core';
import {Article, ArticleTag, ArticleType, FeedService, TagColor} from '../../core/feed.service';
import {of} from 'rxjs';


const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor},
]
const mockType: ArticleType = {id: 1, name: 'testType'}
const mockArticle: Article[] = [
  {id: 1, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag}
]

@Component({selector: 'app-filter', template: ''})
class MockFilterComponent {
  @Input() tags: ArticleTag[]
}

@Component({selector: 'app-feed-list', template: ''})
class MockFeedListComponent {
  @Input() articles: Article[]
}

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let feedService: jasmine.SpyObj<FeedService>;

  beforeEach(async(() => {
    const feedSpy = jasmine.createSpyObj('FeedService',
      ['getArticleByUser']);

    TestBed.configureTestingModule({
      providers: [{provide: FeedService, useValue: feedSpy}],
      declarations: [ FeedComponent, MockFilterComponent, MockFeedListComponent ]
    }).compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    feedService = TestBed.get(FeedService);
    feedService.getArticleByUser.and.returnValue(of(mockArticle))
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
