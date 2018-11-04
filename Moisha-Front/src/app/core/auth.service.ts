import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

export const TOKEN_KEY = 'access_token';
export function tokenGetter() {
  return localStorage.getItem(TOKEN_KEY);
}

export interface SignUpPayload {
  email: string
  name: string
  studentId: number
  major: string
  password: string
  nickName: string
}
export interface AuthResponse {
  name: string;
  token: string;
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
  graduate;
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

}
