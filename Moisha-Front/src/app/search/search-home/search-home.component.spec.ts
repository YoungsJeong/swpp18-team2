import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHomeComponent } from './search-home.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {from, Observable, of} from 'rxjs';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {TagColor} from '../../core/feed.service';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';


@Component({selector: 'app-navbar', template: ''})
class MockNavbarComponent {
  @Input() name: String;
  @Output() search = new EventEmitter();
}
@Component({selector: 'app-side-bar', template: ''})
class MockSidebarComponent {
}
@Component({selector: 'app-interest-list', template: ''})
class MockInterestListComponent {
  @Input() interests: Interest[]
}
class MockAuthService extends AuthService {
  user
  getUser() {
    return of(mockUser)
  }
}
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
describe('SearchHomeComponent', () => {
  let component: SearchHomeComponent;
  let fixture: ComponentFixture<SearchHomeComponent>;
  let authService: AuthService
  let interestService: jasmine.SpyObj<InterestService>;


  beforeEach(async(() => {
    const interestSpy = jasmine.createSpyObj('InterestService', ['getInterestTags', 'searchInterest', 'searchInterestByTag'])

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ SearchHomeComponent, MockNavbarComponent, MockSidebarComponent, MockInterestListComponent],
      providers: [{provide: AuthService, useClass: MockAuthService},
        {provide: InterestService, useValue: interestSpy},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                keyword: 'test'
              })
            }
          }
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService)
    interestService = TestBed.get(InterestService)
    interestService.getInterestTags.and.returnValue(of(mockInterestTags))
    interestService.searchInterest.and.returnValue(of(mockInterest))
    interestService.searchInterestByTag.and.returnValue(of(mockInterest))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    authService.user = mockUser
    component.ngOnInit()
    expect(component).toBeTruthy();
  });
  it('should be able to search interest with/without keyword', () => {
    component.searchInterest('keyword')
    expect(component.searchResult).toEqual(mockInterest)
    component.searchInterest('')
    expect(component.searchResult).toEqual(mockInterest)
  });
});
