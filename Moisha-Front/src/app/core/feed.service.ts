import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DepartmentSearchResponse} from './user.service';

export interface TagColor {
  id: number,
  name: string,
  rgb: string
}
export interface ArticleTag {
  id: number,
  name: string,
  color: TagColor
}
export interface ArticleType {
  id: number,
  name: string
}
export interface Article {
  id: number,
  title: string,
  content: string,
  author: string,
  type: ArticleType,
  tags: ArticleTag[]
}

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }
  getArticleByUser() {
    return this.http.get<Article[]>('/article/');
  }
  getArticleByInterest(id: number) {
    return this.http.get<Article[]>('/article/interest/'+ id + '/');
  }
}
