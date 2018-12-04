import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import {AuthService} from './app/core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(route: Route): boolean {
    const url = route.path;
    console.log('url in guard: ', url);
    const isLoggedIn = this.auth.isLoggedIn;
    if (url === '' || url === 'feed') {
      if (isLoggedIn) {
        return true;
      }
      this.auth.redirectUrl = url;
      this.router.navigate(['intro']);
    } else if (url === 'intro' || url === 'signup') {
      if (!isLoggedIn) {
        return true;
      }
      this.router.navigate(['/']);
    } else if (url === 'search') {
      if (isLoggedIn) {
        return true;
      }
      this.auth.redirectUrl = url;
      this.router.navigate(['intro']);
    } else if (url === 'interest') {
      if (isLoggedIn) {
        return true;
      }
      this.auth.redirectUrl = url;
      this.router.navigate(['intro']);
    } else if (new RegExp('^profile').test(url)) {
      if (url === 'profile') {
        if (isLoggedIn) {
          return true;
        }
      } else if (url === 'profile/detail'){
        if (isLoggedIn) {
          return true;
        }
      }
      this.auth.redirectUrl = url;
      this.router.navigate(['intro']);
    } else {
      console.error('unhandled url: ', url);
      return true;
    }
  }
}
