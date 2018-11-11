import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {Observable, of} from 'rxjs';
import {AuthGuard} from './auth.guard';
import {AuthService} from './app/core/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

class MockAuthService extends AuthService {
  loggedIn;
  get isLoggedIn(): boolean {
    return this.loggedIn
  }

  login(email, password) {
    if (email === 'test@test.com' && password === 'Qwe12345') {
      this.loggedIn = true
      return of({name: 'test', token: 'test'})
    }
    else {
      this.loggedIn = false
      return Observable.create(observer => {
        observer.error(new Error('Error!'));
        observer.complete();
      })
    }
  }
}
describe('AuthGuard', () => {
  let guard: AuthGuard;
  const MockRoute = (url: string) => {
    return { path: url } as any;
  };
  const createMockRouteState = () => null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthGuard, {provide: AuthService, useClass: MockAuthService}]
    }).compileComponents();
    guard = TestBed.get(AuthGuard)
  }));

  it('test feed, empty', inject([Router, AuthService],(router: Router, auth: AuthService) => {
    const navigateSpy = spyOn(router, 'navigate');
    auth.login('test', 'test')
    guard.canLoad(MockRoute(''))
    expect(navigateSpy).toHaveBeenCalledWith(['intro']);
    guard.canLoad(MockRoute('feed'))
    expect(navigateSpy).toHaveBeenCalledWith(['intro']);
    auth.login('test@test.com', 'Qwe12345')
    let result = guard.canLoad(MockRoute(''))
    expect(result).toBeTruthy()
    result = guard.canLoad(MockRoute('feed'))
    expect(result).toBeTruthy()

  }));
  it('test intro/signup', inject([Router, AuthService],(router: Router, auth: AuthService) => {
    const navigateSpy = spyOn(router, 'navigate');
    auth.login('test', 'test')
    let result = guard.canLoad(MockRoute('intro'))
    expect(result).toBeTruthy()
    result = guard.canLoad(MockRoute('signup'))
    expect(result).toBeTruthy()

    auth.login('test@test.com', 'Qwe12345')
    guard.canLoad(MockRoute('intro'))
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    result = guard.canLoad(MockRoute('signup'))
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  }));

  it('test search', inject([Router, AuthService],(router: Router, auth: AuthService) => {
    const navigateSpy = spyOn(router, 'navigate');
    auth.login('test', 'test')
    guard.canLoad(MockRoute('search'))
    expect(navigateSpy).toHaveBeenCalledWith(['intro']);
    auth.login('test@test.com', 'Qwe12345')
    const result = guard.canLoad(MockRoute('search'))
    expect(result).toBeTruthy()
  }));
  it('test interest', inject([Router, AuthService],(router: Router, auth: AuthService) => {
    const navigateSpy = spyOn(router, 'navigate');
    auth.login('test', 'test')
    guard.canLoad(MockRoute('interest'))
    expect(navigateSpy).toHaveBeenCalledWith(['intro']);
    auth.login('test@test.com', 'Qwe12345')
    const result = guard.canLoad(MockRoute('interest'))
    expect(result).toBeTruthy()
  }));
  it('else route', inject([Router, AuthService],(router: Router, auth: AuthService) => {
    const navigateSpy = spyOn(router, 'navigate');
    const result = guard.canLoad(MockRoute('test'))
    expect(result).toBeTruthy()
  }));

});
