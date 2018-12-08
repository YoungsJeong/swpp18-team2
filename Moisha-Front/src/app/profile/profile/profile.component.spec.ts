import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../../core/auth.service';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {Observable, of} from 'rxjs';
import {TagColor} from '../../core/feed.service';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const mockUser = {id: 1, email: 'test@test.com', password: 'Qwe12345'}
const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor, noShow: false}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]
class MockAuthService extends AuthService {
  user
  getUser() {
    return of(mockUser)
  }
}
@Component({selector: 'app-navbar', template: ''})
class MockNavbarComponent {
  @Input() name: String;
  @Output() search = new EventEmitter();
}
@Component({selector: 'app-side-bar', template: ''})
class MockSidebarComponent {
}
@Component({selector: 'app-profile-userinfo', template: ''})
class MockProfileUserinfoComponent {
  @Input() user
}
@Component({selector: 'app-profile-interest', template: ''})
class MockProfileInterestComponent {
  @Input() interests: Interest[]
}
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: AuthService
  let interestService: jasmine.SpyObj<InterestService>;
  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser'])
    const interestSpy = jasmine.createSpyObj('InterestService', ['getUserInterests'])
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, NgbModule.forRoot()],
      declarations: [ ProfileComponent, MockNavbarComponent, MockSidebarComponent, MockProfileUserinfoComponent, MockProfileInterestComponent ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: InterestService, useValue: interestSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService)
    interestService = TestBed.get(InterestService)
    interestService.getUserInterests.and.returnValue(of(mockInterest))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    authService.user = mockUser
    component.ngOnInit()
    expect(component).toBeTruthy()
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
