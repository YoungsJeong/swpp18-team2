import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DepartmentSearchResponse} from './user.service';
export interface ArticleTag {
  id: number,
  name: string
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
  getArticles() {
    return this.http.get<Article[]>('/article');
  }
}
