import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReplyComponent } from './write-reply.component';
import {Author, Comment, Reply} from '../../core/reply.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';



const mockAuthor: Author = { id: 1, nickName: 'testAuthor'}
const mockReply: Reply[] = [
  {id: 1, content: 'testContent', author: mockAuthor, createdDate: 'now'}
]
const mockComment: Comment[] = [
  {id: 1, replies: mockReply, content: 'testContent', createdDate: 'now', author: mockAuthor,
    article: 'testArticle', comment: 1}
]

describe('WriteReplyComponent', () => {
  let component: WriteReplyComponent;
  let fixture: ComponentFixture<WriteReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ WriteReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteReplyComponent);
    component = fixture.componentInstance;
    component.comment = mockComment[0]
    component.articleID = 1
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit write payload with comment', () => {
    component.formContent.setValue('test')
    const payload = {
      content: 'test',
      article: 1,
      comment: 1,
      author: ''
    }
    component.write.subscribe((result) => {
      expect(result).toEqual(payload)
    })
    component.writeReply()
  });
  it('should emit write payload without comment', () => {
    component.formContent.setValue('test')
    component.comment = null
    const payload = {
      content: 'test',
      article: 1,
      comment: '',
      author: ''
    }
    component.write.subscribe((result) => {
      expect(result).toEqual(payload)
    })
    component.writeReply()
  });
});
