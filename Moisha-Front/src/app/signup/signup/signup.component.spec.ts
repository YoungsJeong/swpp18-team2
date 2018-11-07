import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../core/auth.service';
import {Observable, of} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../core/user.service';

import {NgbModule, NgbTypeaheadConfig, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {Live} from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';
import {InjectionToken} from '@angular/core';

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

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        //FormBuilder,
        NgbModule.forRoot(),
        HttpClientModule,
        SharedModule],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: UserService}],

      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
