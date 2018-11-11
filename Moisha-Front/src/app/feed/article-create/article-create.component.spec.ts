import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCreateComponent } from './article-create.component';
import {AuthService} from '../../core/auth.service';
import {FeedService} from '../../core/feed.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {of} from 'rxjs';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

@Component({selector: 'app-article-form', template: ''})
class MockArticleFormComponent {
  @Input() interestID;
  @Output() confirm = new EventEmitter();
}

describe('ArticleCreateComponent', () => {
  let component: ArticleCreateComponent;
  let fixture: ComponentFixture<ArticleCreateComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let feedService: jasmine.SpyObj<FeedService>;

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser', 'logout'])
    const feedSpy = jasmine.createSpyObj('FeedService',['createArticle'])
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule,],
      providers: [
        {provide: AuthService, useValue: authSpy},
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
    authService = TestBed.get(AuthService)
    authService.getUser.and.returnValue(of({id: 1, name: 'test'}))
    feedService = TestBed.get(FeedService)
    fixture.detectChanges();
  });

  it('should create', () => {
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
});
