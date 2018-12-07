import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserinfoComponent } from './profile-userinfo.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {AuthService} from '../../core/auth.service';
import {Observable, of} from 'rxjs';



const mockUser = {id: 1, email: 'test@test.com', password: 'Qwe12345'}
class MockAuthService extends AuthService {
  user
  isDuplicate
  getUser() {
    return of(mockUser)
  }
  modifyInfo(payload) {
    if (payload.nickName == 'test')
      return of(mockUser)
    else
      return Observable.create(observer => {
        observer.error(new Error('Error!'));
        observer.complete();
      })
  }
  checkNickName() {
    return of(this.isDuplicate)
  }
  checkEmail() {
    return of(this.isDuplicate)
  }

}

const mockDepartment = [{ id: '1', name: 'test'}];
const MockUser = {id: 1, email: 'test@test.com', password: 'Qwe12345', name: 'test', nickName: 'test', studentId: 123456789,
major: mockDepartment}

describe('ProfileUserinfoComponent', () => {
  let component: ProfileUserinfoComponent;
  let fixture: ComponentFixture<ProfileUserinfoComponent>;
  let authService: AuthService
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbModule.forRoot(),
        HttpClientModule,
        SharedModule],
      declarations: [ ProfileUserinfoComponent ],
      providers: [{provide: AuthService, useClass: MockAuthService},]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserinfoComponent);
    authService = TestBed.get(AuthService)
    component = fixture.componentInstance;
    component.user = MockUser
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be able to submit info', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.formNickName.setValue('false')
    component.submitInfo()
    expect(component.error).toBeTruthy()
    component.formNickName.setValue('test')
    component.submitInfo()
    expect(component.pending).toBeFalsy()
    expect(navigateSpy).toHaveBeenCalledWith(['/'])
  });
  it('test validator', () => {
    component.formPassword.setValue('test')
    expect(component.formPassword.errors.invalidPassword).toBeTruthy()
    component.formPassword.setValue('Qwe12345')
    expect(component.formPassword.valid).toBeTruthy()

    component.formConfirmPassword.setValue('Qwe12345')
    expect(component.formConfirmPassword.valid).toBeTruthy()
    component.formConfirmPassword.setValue('test')
    expect(component.infoForm.errors.passwordMismatch).toBeTruthy()

  });
});
