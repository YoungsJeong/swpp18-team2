import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../../core/auth.service';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {of} from 'rxjs';
import {TagColor} from '../../core/feed.service';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]

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

  let authService: jasmine.SpyObj<AuthService>;
  let interestService: jasmine.SpyObj<InterestService>;
  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser'])
    const interestSpy = jasmine.createSpyObj('InterestService', ['getUserInterests'])
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, NgbModule.forRoot()],
      declarations: [ ProfileComponent, MockNavbarComponent, MockSidebarComponent, MockProfileUserinfoComponent, MockProfileInterestComponent ],
      providers: [
        {provide: AuthService, useValue: authSpy},
        {provide: InterestService, useValue: interestSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService)
    authService.getUser.and.returnValue(of({id: 1, name: 'test'}))
    interestService = TestBed.get(InterestService)
    interestService.getUserInterests.and.returnValue(of(mockInterest))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
