import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AuthService} from '../../core/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Article} from '../../core/feed.service';
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
const mockUser = [{id: '1', name: 'test'}]
class MockAuthService extends AuthService {
  user
  getUser() {
    return of(mockUser)
  }
}
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ HomeComponent, MockNavbarComponent, MockSidebarComponent ],
      providers: [
        {provide: AuthService, useClass: MockAuthService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    authService.user = mockUser
    component.ngOnInit()
    expect(component).toBeTruthy();
  });
  it('should able to search interest with keyword', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.searchInterest('keyword')
    expect(navigateSpy).toHaveBeenCalledWith(['search', Object({ keyword: 'keyword' })]);
  });
  it('should able to search interest without keyword', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.searchInterest(null)
    expect(navigateSpy).toHaveBeenCalledWith(['search', Object({keyword: ''})]);
  });
});
