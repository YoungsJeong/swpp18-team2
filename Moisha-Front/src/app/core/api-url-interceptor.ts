import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {TOKEN_KEY} from "./auth.service";

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var request
    if(req.url !== '/user/login/' && req.url !== '/user/signup/' && !(new RegExp('^\\/search\\/department').test(req.url)))
      request = req.clone({ url: environment.apiURL + req.url,
    headers: req.headers.set('Authorization', 'token '+localStorage.getItem(TOKEN_KEY))});
    else
      request = req.clone({ url: environment.apiURL + req.url});
    return next.handle(request);
  }
}
