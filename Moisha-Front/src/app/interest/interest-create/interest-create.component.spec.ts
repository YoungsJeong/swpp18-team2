import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestCreateComponent } from './interest-create.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../core/auth.service';
import {Article, FeedService, TagColor} from '../../core/feed.service';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {of} from 'rxjs';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';


@Component({selector: 'app-interest-form', template: ''})
class MockInterestFormComponent {
  @Output() confirm = new EventEmitter();
}
class MockAuthService extends AuthService {
  user
  getUser() {
    return of(mockUser)
  }
}
const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor, noShow: false}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]
const mockUser = {id: '1', name: 'test', interests: mockInterest}
describe('InterestCreateComponent', () => {
  let component: InterestCreateComponent;
  let fixture: ComponentFixture<InterestCreateComponent>;
  let authService: AuthService
  let interestService: jasmine.SpyObj<InterestService>;

  beforeEach(async(() => {
    const interestSpy = jasmine.createSpyObj('InterestService',['createInterest'])
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ InterestCreateComponent, MockInterestFormComponent ],
      providers: [{provide: AuthService, useClass: MockAuthService},
        {provide: InterestService, useValue: interestSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestCreateComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService)
    interestService = TestBed.get(InterestService)
    interestService.createInterest.and.returnValue(of(mockInterest[0]))
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
  it('should able to create interest', () => {
    authService.user = mockUser
    const payload = {
      createUser: null,
      name: 'test',
      interestTags: [1],
      detail: '',
      photoURL: ''
    }
    component.createInterest(payload)
    expect(interestService.createInterest).toHaveBeenCalled();
  });
});
