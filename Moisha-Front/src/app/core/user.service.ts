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
}
