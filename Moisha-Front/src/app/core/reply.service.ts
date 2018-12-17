import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Interest} from './interest.service';

// Reply : Comment to a Comment
export interface Reply {
  id: number,
  content: string,
  author: Author,
  createdDate: string
}
export interface Author {
  id: number,
  nickName: String
}
export interface Comment {
  id: number,
  replies: Reply[],
  content: string,
  createdDate: string,
  author: Author,
  article: string,
  comment: number,
  deleted: boolean
}
@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor(private http: HttpClient) { }
  getCommentsToArticle(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>('/article/' + id + '/comment/').pipe(tap())
  }
  createComment(payload) {
    return this.http.post('/comment/', payload);
  }
  deleteComment(id: number) {
    return this.http.delete('/comment/' + id + '/')
  }
  editComment(editPayload) {
    return this.http.put('/comment/' + editPayload.id + '/', editPayload).pipe(tap())
  }
}
