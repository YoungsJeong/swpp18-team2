import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface TagColor {
  id: number,
  name: string,
  rgb: string
}
export interface InterestTag {
  id: number,
  name: string,
  color: TagColor,
  noShow: boolean
}
export interface Interest {
  id: number,
  name: string,
  createUser: string,
  createdDate: string,
  photoURL: string,
  tags: InterestTag[],
  managers?: any
}
@Injectable({
  providedIn: 'root'
})
export class InterestService {

  constructor(private http: HttpClient) { }
  searchInterestByUser(keyword: string) {
    const params = new HttpParams().set('q', keyword);
    return this.http.get<Interest[]>('/search/interest/user', {
      params
    });
  }
  searchInterest(keyword: string) {
    const params = new HttpParams().set('q', keyword);
      return this.http.get<Interest[]>('/search/interest', {
        params
      });
  }
  getInterestTags() {
    return this.http.get<InterestTag[]>('/interest/tags/')
  }
  searchInterestByTag(keyword: string, tags) {
    let params = new HttpParams().set('q', keyword);
    params = params.append('tags', tags)
    return this.http.get<Interest[]>('/search/interest/tag', {
      params
    });
  }
  searchTag(search: string): Observable<InterestTag[]> {
    const params = new HttpParams().set('q', search);
    return this.http.get<InterestTag[]>('/search/interesttag', {
      params
    }).pipe(tap());
  }
  createInterest(payload) {
    return this.http.post('/interest/create/', payload);
  }
  getUserInterests(): Observable<Interest[]> {
    return this.http.get<Interest[]>('/interest/user').pipe(tap())
  }
  getInterestRecommendationById(interestId: number): Observable<Interest[]> {
    return this.http.get<Interest[]>('/interest/recommend/' + interestId + '/').pipe(tap())
  }
  getInterestRecommendation(): Observable<Interest[]> {
    return this.http.get<Interest[]>('/interest/recommend/').pipe(tap())
  }
  getInterestRecommendationByTag(tags): Observable<Interest[]> {
    const params = new HttpParams().set('tags', tags)
    return this.http.get<Interest[]>('/interest/recommend/tag/',{params}).pipe(tap())
  }
  getInterestByID(id: number, create?: boolean){
    let params
    if(create)
      params = new HttpParams().set('create', 'true');
    return this.http.get<Interest>('/interest/' + id + '/',{
      params
    })
  }
}
