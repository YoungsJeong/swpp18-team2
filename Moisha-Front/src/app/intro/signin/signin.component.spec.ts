import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../core/auth.service';
import {SharedModule} from '../../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {Observable, of} from 'rxjs';
class MockAuthService extends AuthService {
  login(email, password) {
    if (email === 'test@test.com' && password === 'Qwe12345')
      return of({name: 'test', token: 'test'})
    else
      return Observable.create(observer => {
          observer.error(new Error('Error!'));
        observer.complete();
      })
  }
}
describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, HttpClientModule],
      providers: [{provide: AuthService, useClass: MockAuthService}],
      declarations: [ SigninComponent ]
    })
    .compileComponents();
    authServiceSpy = TestBed.get(AuthService)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test login', async(() => {
    const email = component.signInForm.get('email')
    const password = component.signInForm.get('password')
    email.setValue('invalid')
    password.setValue('Qwe12345')
    component.login()
    expect(component.submitAttempt).toEqual(true)
    expect(component.signInForm.valid).toEqual(false)
    email.setValue('test@test.com')
    password.setValue('Qwe12345')
    component.login()
    expect(component.submitAttempt).toEqual(true)
    expect(component.signInForm.valid).toEqual(true)
    expect(component.error).toEqual(false)
    email.setValue('testerror@test.com')
    password.setValue('Qwe12345')
    component.login()
    expect(component.submitAttempt).toEqual(true)
    expect(component.signInForm.valid).toEqual(true)
    expect(component.error).toEqual(true)
  }));
  it('test signup', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.goToSignUp();
    expect(navigateSpy).toHaveBeenCalledWith(['/signup']);
  });
  it('test forms', () => {
    const email = component.signInForm.get('email')
    const password = component.signInForm.get('password')
    expect(email).toEqual(component.formEmail)
    expect(password).toEqual(component.formPassword)
  });

});
