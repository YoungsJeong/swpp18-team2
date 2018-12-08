import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCreateComponent } from './article-create.component';
import {AuthService} from '../../core/auth.service';
import {Article, ArticleTag, ArticleType, FeedService, TagColor} from '../../core/feed.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {of} from 'rxjs';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

@Component({selector: 'app-article-form', template: ''})
class MockArticleFormComponent {
  @Input() interestID;
  @Output() confirm = new EventEmitter();
}
class MockAuthService extends AuthService {
  user
  getUser() {
    return of(mockUser)
  }
}
const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor, noShow: false},
]
const mockType: ArticleType = {id: 1, name: 'testType'}
const mockArticle: Article[] = [
  {id: 1, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag},
]
const mockUser = {id: 1, email: 'test@test.com', password: 'Qwe12345'}
describe('ArticleCreateComponent', () => {
  let component: ArticleCreateComponent;
  let fixture: ComponentFixture<ArticleCreateComponent>;
  let feedService: jasmine.SpyObj<FeedService>;
  let authService: AuthService;

  beforeEach(async(() => {
    const feedSpy = jasmine.createSpyObj('FeedService',['createArticle'])
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: FeedService, useValue: feedSpy},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        }],
      declarations: [ ArticleCreateComponent, MockArticleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCreateComponent);
    component = fixture.componentInstance;
    feedService = TestBed.get(FeedService)
    feedService.createArticle.and.returnValue(of(mockArticle[0]))
    authService = TestBed.get(AuthService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    authService.user = mockUser
    component.ngOnInit()
    expect(component).toBeTruthy();
    expect(component).toBeTruthy();
  });
  it('should able to search interest with keyword', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.searchInterest('keyword')
    expect(navigateSpy).toHaveBeenCalledWith(['search', Object({ keyword: 'keyword' })]);
  });
  it('should able to search interest without keyword', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.searchInterest(null)
    expect(navigateSpy).toHaveBeenCalledWith(['search', Object({keyword: ''})]);
  });
  it('should able to create new article', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    const payload = {
      title: 'test',
      content: 'test',
      author: null
    }
    authService.user = mockUser
    component.createArticle(payload)
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    expect(feedService.createArticle).toHaveBeenCalled()
  });
});
