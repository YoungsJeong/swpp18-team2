import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Article} from './feed.service';

export interface DepartmentSearchResponse {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  searchDepartment(search: string): Observable<DepartmentSearchResponse[]> {
    const params = new HttpParams().set('q', search);
    return this.http.get<DepartmentSearchResponse[]>('/search/department', {
      params
    });
  }
  getUserByInterest(id: number, limit?: number) {
    let params;
    if(limit)
      params = new HttpParams().set('limit', limit.toString());
    return this.http.get<Article[]>('/user/interest/' + id + '/', {
    params
    });
    }

}
