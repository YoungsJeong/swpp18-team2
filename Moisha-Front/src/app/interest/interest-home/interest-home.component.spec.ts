import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestHomeComponent } from './interest-home.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../core/auth.service';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';


@Component({selector: 'app-navbar', template: ''})
class MockNavbarComponent {
  @Input() name: String;
  @Output() search = new EventEmitter();
}
@Component({selector: 'app-side-bar', template: ''})
class MockSidebarComponent {
}
const mockUser = {id: '1', name: 'test'}
class MockAuthService extends AuthService {
  user
  getUser() {
    return of(mockUser)
  }
}
@Component({selector: 'app-profile-userinfo', template: ''})
class MockProfileUserinfoComponent {
  @Input() user
}
describe('InterestHomeComponent', () => {
  let component: InterestHomeComponent;
  let fixture: ComponentFixture<InterestHomeComponent>;
  let authService: AuthService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ InterestHomeComponent, MockNavbarComponent, MockSidebarComponent ],
      providers: [
        {provide: AuthService, useClass: MockAuthService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestHomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService)
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
  it('should be able to search interest with keyword', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.searchInterest('keyword')
    expect(navigateSpy).toHaveBeenCalledWith([ 'search', Object({ keyword: 'keyword' })]);
  });
  it('should be able to search interest without keyword', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.searchInterest()
    expect(navigateSpy).toHaveBeenCalledWith([ 'search', Object({ keyword: '' })]);
  });
});
