import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditComponent } from './article-edit.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {Article, ArticleTag, ArticleType, FeedService, TagColor} from '../../core/feed.service';
import {AuthService} from '../../core/auth.service';
import {of} from 'rxjs';
import {SharedModule} from '../../shared/shared.module';

const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor, noShow: false},
]
const mockType: ArticleType = {id: 1, name: 'testType'}
const mockArticle: Article[] = [
  {id: 1, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag},
]
const mockUser = {id: 1, email: 'test@test.com', password: 'Qwe12345'}

@Component({selector: 'app-article-edit-form', template: ''})
class MockArticleEditFormComponent {
  @Input() article;
  @Output() confirm = new EventEmitter();
}
class MockAuthService extends AuthService {
  user
  getUser() {
    return of(mockUser)
  }
}
describe('ArticleEditComponent', () => {
  let component: ArticleEditComponent;
  let fixture: ComponentFixture<ArticleEditComponent>;
  let feedService: jasmine.SpyObj<FeedService>;
  let authService: AuthService;
  beforeEach(async(() => {
    const feedSpy = jasmine.createSpyObj('FeedService',['getArticleById', 'editArticle'])
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ ArticleEditComponent, MockArticleEditFormComponent ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: FeedService, useValue: feedSpy},
        {provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: convertToParamMap({
              id: '1'
            })
          }
        }}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEditComponent);
    component = fixture.componentInstance;
    feedService = TestBed.get(FeedService)
    feedService.getArticleById.and.returnValue(of(mockArticle))
    feedService.editArticle.and.returnValue(of(mockArticle))
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
  it('should able to edit article', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    const payload = {
      articleId: 1,
      title: 'test',
      content: 'test',
      author: null
    }
    authService.user = mockUser
    component.editArticle(payload)
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    expect(feedService.editArticle).toHaveBeenCalled()
  });
});
