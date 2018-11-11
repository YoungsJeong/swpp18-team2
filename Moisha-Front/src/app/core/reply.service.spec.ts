import {TestBed, inject, async} from '@angular/core/testing';

import {Author, Comment, Reply, ReplyService} from './reply.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {InterestService} from './interest.service';

const mockAuthor: Author = { id: 1, nickName: 'testAuthor'}
const mockReply: Reply[] = [
  {id: 1, content: 'testContent', author: mockAuthor, createdDate: 'now'}
  ]
const mockComment: Comment[] = [
  {id: 1, replies: mockReply, content: 'testContent', createdDate: 'now', author: mockAuthor,
  article: 'testArticle', comment: 1}
  ]
describe('ReplyService', () => {
  let httpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ReplyService]
    });
    httpClient = TestBed.get(HttpTestingController)

  });

  it('should be created', inject([ReplyService], (service: ReplyService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to get comments to an article', async(inject([ReplyService], (service: ReplyService) => {
    service.getCommentsToArticle(3).subscribe((result) => {
      expect(result).toEqual(mockComment)
    })
    const req = httpClient.expectOne(req => req.url.includes(`/article/3/comment/`));
    expect(req.request.method).toBe('GET')
    req.flush(mockComment);
    httpClient.verify();
  })));
  it('should be able to create Comment', async(inject([ReplyService], (service: ReplyService) => {
    const payload = {id: 1, content: 'test'}
    service.createComment(payload).subscribe((result) => {
      expect(result).toEqual(mockComment[0])
    })
    const req = httpClient.expectOne(req => req.url.includes(`/comment/`));
    expect(req.request.method).toBe('POST')
    req.flush(mockComment[0]);
    httpClient.verify();
  })));
  it('should be able to delete Comment', async(inject([ReplyService], (service: ReplyService) => {
    service.deleteComment(3).subscribe((result) => {
      expect(result).toEqual(mockComment[0])
    })
    const req = httpClient.expectOne(req => req.url.includes(`/comment/3/`));
    expect(req.request.method).toBe('DELETE')
    req.flush(mockComment[0]);
    httpClient.verify();
  })));
  it('should be able to edit Comment', async(inject([ReplyService], (service: ReplyService) => {
    const payload = {id: 3, content: 'test'}
    service.editComment(payload).subscribe( (result) => {
      expect(result).toEqual(mockComment[0])
    })
    const req = httpClient.expectOne(req => req.url.includes(`/comment/3/`));
    expect(req.request.method).toBe('PUT')
    req.flush(mockComment[0]);
    httpClient.verify();
  })));

});
