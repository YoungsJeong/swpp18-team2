import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = req.clone({ url: environment.apiURL + req.url });
    return next.handle(request);
  }
}
