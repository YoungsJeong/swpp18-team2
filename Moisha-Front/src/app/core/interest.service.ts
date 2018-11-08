import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Article, TagColor} from './feed.service';
import {Observable} from 'rxjs';
import {DepartmentSearchResponse} from './user.service';
import {tap} from 'rxjs/operators';


export interface InterestTag {
  id: number,
  name: string,
  color: TagColor
}
export interface Interest {
  id: number,
  name: string,
  createUser: string,
  createdDate: string,
  photoURL: string,
  tags: InterestTag[]
}
@Injectable({
  providedIn: 'root'
})
export class InterestService {

  constructor(private http: HttpClient) { }

  searchInterest(keyword: string) {
    const params = new HttpParams().set('q', keyword);
      return this.http.get<Interest[]>('/search/interest', {
        params
      });
  }
  searchTag(search: string): Observable<InterestTag[]> {
    const params = new HttpParams().set('q', search);
    return this.http.get<InterestTag[]>('/search/tag', {
      params
    }).pipe(tap((result) => console.log(result)));
  }
  createInterest(payload) {
    return this.http.post('/interest/', payload);
  }
  getUserInterests(): Observable<Interest[]> {
    return this.http.get<Interest[]>('/interest/user').pipe(tap((result) => console.log(result)))
  }
}