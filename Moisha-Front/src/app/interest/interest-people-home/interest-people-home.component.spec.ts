import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPeopleHomeComponent } from './interest-people-home.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {InterestService} from '../../core/interest.service';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../core/user.service';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

const mockUser = [{id: '1', name: 'test'}]

class MockAuthService extends AuthService {
  user
  getUser() {
    return of(mockUser)
  }
}

@Component({selector: 'app-interest-people-list', template: ''})
class MockInterestPeopleListComponent {
  @Input() users
}
describe('InterestPeopleHomeComponent', () => {
  let component: InterestPeopleHomeComponent;
  let fixture: ComponentFixture<InterestPeopleHomeComponent>;
  let authService: AuthService
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser'])
    const userSpy = jasmine.createSpyObj('UserService',['getUserByInterest'])
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ InterestPeopleHomeComponent, MockInterestPeopleListComponent],
      providers: [{provide: AuthService, useClass: MockAuthService},
        {provide: UserService, useValue: userSpy},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestPeopleHomeComponent);
    component = fixture.componentInstance;
    component.interestID = 1
    authService = TestBed.get(AuthService)
    userService = TestBed.get(UserService)
    userService.getUserByInterest.and.returnValue(of(mockUser))
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test for branches', () => {
    authService.user = mockUser
    component.ngOnInit()
    expect(component).toBeTruthy();
  });
});
