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
const mockDepartment = [{ id: '1', name: 'test'}];

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
  signup(payload){
    if(payload.name === 'success'){
      return of({result: 'success'})
    }
    else {
      return Observable.create(observer => {
        observer.error(new Error('Error!'));
        observer.complete();
      })
    }
  }
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    const userSpy = jasmine.createSpyObj('UserService',['searchDepartment'])
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        NgbModule.forRoot(),
        HttpClientModule,
        SharedModule],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: UserService, useValue: userSpy},
      ],

      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService)
    userService.searchDepartment.and.returnValue(of(mockDepartment))
    fixture.detectChanges();
    component.formMajor.setValue('test')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be able to signup', () => {
    component.formName.setValue('fail')
    component.signUpRequest()
    expect(component.error).toBeTruthy()
    component.formName.setValue('success')
    expect(component.pending).toBeFalsy()
  });
  it('test validator', () => {

    component.formPassword.setValue('test')
    expect(component.formPassword.errors.invalidPassword).toBeTruthy()
    component.formPassword.setValue('Qwe12345')
    expect(component.formPassword.valid).toBeTruthy()

    component.formConfirmPassword.setValue('Qwe12345')
    expect(component.formConfirmPassword.valid).toBeTruthy()
    component.formConfirmPassword.setValue('test')
    expect(component.signUpForm.errors.passwordMismatch).toBeTruthy()

    component.formMajor.setValue({id: 1, name: 'test'})
    expect(component.formMajor.valid).toBeTruthy()
    component.formMajor.setValue({name: 'test'})
    expect(component.formMajor.errors.invalidDepartment).toBeTruthy()

    component.formStudentId.setValue('2018-12345')
    expect(component.formStudentId.valid).toBeTruthy()
    component.formStudentId.setValue('2018112345')
    expect(component.formStudentId.errors.invalidStudentId).toBeTruthy()
  });
});
