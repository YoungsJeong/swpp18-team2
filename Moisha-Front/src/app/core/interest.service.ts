import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Article} from './feed.service';

export interface InterestTag {
  id: number,
  name: string
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

}
