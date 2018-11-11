import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import {Author, Comment, Reply} from '../../core/reply.service';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

@Component({selector: 'app-write-reply', template: ''})
class MockWriteReplyComponent {
  @Input() comment: Comment
  @Input() articleID: number
  @Output() write = new EventEmitter();
}
describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  const mockAuthor: Author = { id: 1, nickName: 'testAuthor'}
  const mockReply: Reply[] = [
    {id: 1, content: 'testContent', author: mockAuthor, createdDate: 'now'}
  ]
  const mockComment: Comment[] = [
    {id: 1, replies: mockReply, content: 'testContent', createdDate: 'now', author: mockAuthor,
      article: 'testArticle', comment: 1}
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ CommentComponent, MockWriteReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = mockComment[0]
    component.user = {id: 1, name: 'test'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
