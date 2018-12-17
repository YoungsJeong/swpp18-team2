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
import {Article, ArticleTag, ArticleType, FeedService, TagColor} from '../../core/feed.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';


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

const mockUser: Author = { id: 1, nickName: 'test'}
class MockAuthService extends AuthService {
  user
  getUser() {
    return of(mockUser)
  }
}
const mockAuthor: Author = { id: 1, nickName: 'testAuthor'}
const mockReply: Reply[] = [
  {id: 1, content: 'testContent', author: mockAuthor, createdDate: 'now'}
]
const mockComment = [
  {id: 1, replies: mockReply, content: 'testContent', createdDate: 'now', author: mockAuthor,
    article: 'testArticle', deleted: false}
]
const mockComment2 = [
  {id: 1, replies: mockReply, content: 'testContent', createdDate: 'now', author: mockAuthor,
    article: 'testArticle', comment: 1, deleted: false}
]
const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor, noShow: false}
]
const mockType: ArticleType = {id: 1, name: 'testType'}
const mockArticle: Article[] = [
  {id: 1, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag}
]

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  let replyService: jasmine.SpyObj<ReplyService>;
  let feedService: jasmine.SpyObj<FeedService>;

  let authService: AuthService
  beforeEach(async(() => {
    const replySpy = jasmine.createSpyObj('ReplyService',['getCommentsToArticle', 'createComment',
    'editComment', 'deleteComment'])
    const feedSpy = jasmine.createSpyObj('FeedService', ['deleteArticle'])
    TestBed.configureTestingModule({
      imports: [SharedModule, NgbModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [NgbModal, NgbActiveModal, NgbModalStack, ScrollBar,
        {provide: AuthService, useClass: MockAuthService},
        {provide: FeedService, useValue: feedSpy},
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
    authService.user = mockUser
    replyService = TestBed.get(ReplyService)
    replyService.createComment.and.returnValue(of(mockComment[0]))
    replyService.getCommentsToArticle.and.returnValue(of(mockComment))
    feedService = TestBed.get(FeedService)
    feedService.deleteArticle.and.returnValue(of(mockArticle))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.comments.length).toEqual(1);
    replyService.getCommentsToArticle.and.returnValue(of(mockComment2))
    component.ngOnInit()
    expect(component.comments.length).toEqual(0);
    component.dismiss()
  });
  xit('should be able to delete article', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const payload = {
      content: 'test',
      article: 1,
      comment: '',
      author: ''
    }
    component.deleteArticle()
    expect(feedService.deleteArticle).toHaveBeenCalled()
  });
  it('should be able to delete article not confirm', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const payload = {
      content: 'test',
      article: 1,
      comment: '',
      author: ''
    }
    component.deleteArticle()
    expect(feedService.deleteArticle).not.toHaveBeenCalled()
  });
  it('should be able to write reply', () => {
    const getCommentSpy = spyOn(component, 'getComments');
    const payload = {
      content: 'test',
      article: 1,
      comment: '',
      author: ''
    }
    component.writeReply(payload)
    expect(getCommentSpy).toHaveBeenCalled()
  });
  it('should be able to edit reply', () => {
    const payload = {
      content: 'test',
      article: 1,
      comment: '',
      author: ''
    }
    spyOn(window, 'prompt').and.returnValue('test');
    component.editReply(payload)
    expect(replyService.editComment).not.toHaveBeenCalled()
  });
  it('should be able to edit reply changed', () => {
    const payload = {
      content: 'test',
      article: 1,
      comment: '',
      author: ''
    }
    spyOn(window, 'prompt').and.returnValue('changed');
    component.editReply(payload)
    expect(replyService.editComment).toHaveBeenCalled()
  });
  it('should be able to delete reply confirm', () => {
    replyService.deleteComment.and.returnValue(of(mockComment[0]))
    const payload = {
      content: 'test',
      article: 1,
      comment: '',
      author: ''
    }
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteReply(payload)
    expect(replyService.deleteComment).toHaveBeenCalled()
  });
  it('should be able to delete reply not confirm', () => {
    replyService.deleteComment.and.returnValue(of(mockComment[0]))
    const payload = {
      content: 'test',
      article: 1,
      comment: '',
      author: ''
    }
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteReply(payload)
    expect(replyService.deleteComment).not.toHaveBeenCalled()
  });
});
