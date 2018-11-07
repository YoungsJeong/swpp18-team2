import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Interest} from './interest.service';

// Reply : Comment to a Comment
export interface Reply {
  id: number,
  content: string,
  author: string,
  createdDate: string
}
export interface Comment {
  id: number,
  replies: Reply[],
  content: string,
  createdDate: string,
  author: string,
  article: string,
  comment: number
}
@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor(private http: HttpClient) { }
  getCommentsToArticle(id: number): Observable<Comment[]> {
    // ${} is not working
    return this.http.get<Comment[]>('/article/' + id + '/comment/').pipe(tap((result) => console.log(result)))
  }

}
