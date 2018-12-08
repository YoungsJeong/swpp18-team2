import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DepartmentSearchResponse} from './user.service';
import {tap} from 'rxjs/operators';
import {InterestTag, Interest} from './interest.service';
import {Observable} from 'rxjs';

export interface TagColor {
  id: number,
  name: string,
  rgb: string
}
export interface ArticleTag {
  id: number,
  name: string,
  color: TagColor,
  noShow: boolean
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
  interest?: Interest,
  type: ArticleType,
  tags: ArticleTag[]
}

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  searchTag(search: string): Observable<ArticleTag[]> {
    const params = new HttpParams().set('q', search);
    return this.http.get<ArticleTag[]>('/search/articletag', {
      params
    }).pipe(tap((result) => console.log(result)));
  }
  constructor(private http: HttpClient) { }
  getArticleByUser(page?: number, limit?: number) {
    let params = new HttpParams()
    if(page)
      params = params.append('page', page.toString());
    if(limit)
      params = params.append('limit', limit.toString());
    return this.http.get<Article[]>('/article/', {
      params
    });
  }
  getArticleByUserByTag(tags, page?: number, limit?: number) {
    let params = new HttpParams()
    if(page)
      params = params.append('page', page.toString());
    if(limit)
      params = params.append('limit', limit.toString());
    params = params.append('tags', tags)
    return this.http.get<Article[]>('/article/tags/', {
      params
    });
  }
  getArticleByInterestByTag(id: number, tags,  page?: number, limit?: number) {
    let params = new HttpParams()
    if(page)
      params = params.append('page', page.toString());
    if(limit)
      params = params.append('limit', limit.toString());
    params = params.append('tags', tags)
    return this.http.get<Article[]>('/article/interest/' + id + '/tags/', {
      params
    });
  }
  getArticleByInterest(id: number, page?: number, limit?: number) {
    let params = new HttpParams()
    if(page)
      params = params.append('page', page.toString());
    if(limit)
      params = params.append('limit', limit.toString());
    return this.http.get<Article[]>('/article/interest/' + id + '/', {
      params
    });
  }
  getArticleTags() {
    return this.http.get<ArticleTag[]>('/article/tag/')
  }
  createArticle(payload) {
    return this.http.post('/article/create/', payload);
  }
}
