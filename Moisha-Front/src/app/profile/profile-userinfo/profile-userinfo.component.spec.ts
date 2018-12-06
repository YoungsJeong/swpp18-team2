import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserinfoComponent } from './profile-userinfo.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {AuthService} from '../../core/auth.service';
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

const mockDepartment = [{ id: '1', name: 'test'}];
const MockUser = {id: 1, email: 'test@test.com', password: 'Qwe12345', name: 'test', nickName: 'test', studentId: 123456789,
major: mockDepartment}

describe('ProfileUserinfoComponent', () => {
  let component: ProfileUserinfoComponent;
  let fixture: ComponentFixture<ProfileUserinfoComponent>;

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
    component = fixture.componentInstance;
    component.user = MockUser
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
