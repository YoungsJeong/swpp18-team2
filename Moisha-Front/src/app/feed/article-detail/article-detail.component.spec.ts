import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailComponent } from './article-detail.component';
import {SharedModule} from '../../shared/shared.module';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {ScrollBar} from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import {AuthService} from '../../core/auth.service';
import {of} from 'rxjs';
import {Author, Comment, Reply, ReplyService} from '../../core/reply.service';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Article, ArticleTag, ArticleType, TagColor} from '../../core/feed.service';


@Component({selector: 'app-write-reply', template: ''})
class MockWriteReplyComponent {
  @Input() comment: Comment
  @Input() articleID: number
  @Output() write = new EventEmitter();
}
@Component({selector: 'app-comment', template: ''})
class MockCommentComponent {
  @Input() comment: Comment
  @Input() user
  @Output() write =  new EventEmitter()
  @Output() delete = new EventEmitter()
  @Output() edit = new EventEmitter()
}

const mockAuthor: Author = { id: 1, nickName: 'testAuthor'}
const mockReply: Reply[] = [
  {id: 1, content: 'testContent', author: mockAuthor, createdDate: 'now'}
]
const mockComment: Comment[] = [
  {id: 1, replies: mockReply, content: 'testContent', createdDate: 'now', author: mockAuthor,
    article: 'testArticle', comment: 1}
]
const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor}
]
const mockType: ArticleType = {id: 1, name: 'testType'}
const mockArticle: Article[] = [
  {id: 1, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag}
]

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let replyService: jasmine.SpyObj<ReplyService>;
  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser'])
    const replySpy = jasmine.createSpyObj('ReplyService',['getCommentsToArticle', 'createComment',
    'editComment', 'deleteComment'])

    TestBed.configureTestingModule({
      imports: [SharedModule, NgbModule.forRoot()],
      providers: [NgbModal, NgbActiveModal, NgbModalStack, ScrollBar,
        {provide: AuthService, useValue: authSpy},
        {provide: ReplyService, useValue: replySpy}],
      declarations: [ ArticleDetailComponent, MockWriteReplyComponent, MockCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    component.article = mockArticle[0]
    authService = TestBed.get(AuthService)
    authService.getUser.and.returnValue(of({id: 1, name: 'test'}))
    replyService = TestBed.get(ReplyService)
    replyService.getCommentsToArticle.and.returnValue(of(mockComment))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
