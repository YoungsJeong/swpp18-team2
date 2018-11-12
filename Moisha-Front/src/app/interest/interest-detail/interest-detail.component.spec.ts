import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestDetailComponent } from './interest-detail.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Article, ArticleTag, ArticleType, FeedService, TagColor} from '../../core/feed.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../core/auth.service';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {UserService} from '../../core/user.service';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';

@Component({selector: 'app-feed-list', template: ''})
class MockFeedListComponent {
  @Input() articles: Article[]
}
@Component({selector: 'app-interest-info', template: ''})
class MockInterestInfoComponent {
  @Input() interest
}
@Component({selector: 'app-interest-people-list', template: ''})
class MockInterestPeopelListComponent {
  @Input() users
}
const mockUser = [{id: '1', name: 'test'}]
class MockAuthService extends AuthService {
  user
  getUser() {
    return of(mockUser)
  }
}
const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]
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
describe('InterestDetailComponent', () => {
  let component: InterestDetailComponent;
  let fixture: ComponentFixture<InterestDetailComponent>;
  let authService: AuthService
  let feedService: jasmine.SpyObj<FeedService>;
  let interestService: jasmine.SpyObj<InterestService>;
  let userService: jasmine.SpyObj<UserService>;
  beforeEach(async(() => {

    const authSpy = jasmine.createSpyObj('AuthService', ['getUser'])
    const interestSpy = jasmine.createSpyObj('InterestService', ['getInterestByID'])
    const feedSpy = jasmine.createSpyObj('FeedService', ['getArticleByInterest'])
    const userSpy = jasmine.createSpyObj('UserService',['getUserByInterest'])

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ InterestDetailComponent, MockFeedListComponent, MockInterestInfoComponent, MockInterestPeopelListComponent ],
      providers:
        [{provide: AuthService, useClass: MockAuthService},
        {provide: InterestService, useValue: interestSpy},
        {provide: FeedService, useValue: feedSpy},
        {provide: UserService, useValue: userSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestDetailComponent);
    component = fixture.componentInstance;
    feedService = TestBed.get(FeedService)
    userService = TestBed.get(UserService)
    authService = TestBed.get(AuthService)
    interestService = TestBed.get(InterestService)
    component.interestID = 1
    feedService.getArticleByInterest.and.returnValue(of(mockArticle))
    interestService.getInterestByID.and.returnValue(of(mockInterest[0]))
    userService.getUserByInterest.and.returnValue(of(mockUser))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    authService.user = mockUser

    component.ngOnInit()
    expect(component).toBeTruthy();
    feedService.getArticleByInterest.and.returnValue(of(mockArticles))
    component.ngOnInit()
    expect(component).toBeTruthy();

  });
});
