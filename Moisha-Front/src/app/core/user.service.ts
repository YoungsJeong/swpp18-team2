import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get<any[]>('/user/interest/' + id + '/', {
    params
    });
    }
    addInterestToUser(id: number, shouldAdd: boolean){
      let params
      if(shouldAdd) params = {action: 'add'}
      else params = {action: 'delete'}
      return this.http.put('/user/interest/' + id + '/update/', params)
    }

}
