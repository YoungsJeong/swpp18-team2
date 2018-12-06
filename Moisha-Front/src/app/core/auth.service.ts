import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { catchError, tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

export const TOKEN_KEY = 'access_token';
export function tokenGetter() {
  return localStorage.getItem(TOKEN_KEY);
}

export interface SignUpPayload {
  email: string
  name: string
  nickName: string
  studentId: number
  major: string
  password: string
}
export interface AuthResponse {
  name: string;
  token: string;
}
export interface checkResponse {
  isDuplicate: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  user;
  redirectUrl: string;

  get token() {
    return tokenGetter();
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/user/login/', { username: email, password })
      .pipe(
        tap(({ token }) => this.setToken(token)),
        tap(() => this.router.navigate(['/'])),
        //catchError(this.errorHandler.handleError)
      );
  }

  signup(payload: SignUpPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/user/signup/', payload)
      .pipe(
        tap(({ token }) => this.setToken(token)),
        tap(() => this.router.navigate(['/'])),
        //catchError(this.errorHandler.handleError)
      );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['intro']);
  }
  setUser(user) {
    this.user = user;
    console.log('user: ', user);
  }
  getUser() {
    return this.http.get('/user/info').pipe(
      tap((user: any) => {
        this.setUser(user)
      })
    );
  }
  modifyInfo(payload){
    return this.http.put('/user/modify/', payload)
  }
  checkDuplicate(nickName?: string, email?: string, studentId?: string){
    let params = new HttpParams()
    if(nickName) params = params.append('nickName', nickName)
    else if(email) params = params.append('email', email)
    else if(studentId) params = params.append('studentId', studentId)
    return this.http.get<checkResponse>('/user/check/', {params})
  }
}
