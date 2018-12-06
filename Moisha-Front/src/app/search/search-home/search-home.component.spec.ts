import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHomeComponent } from './search-home.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {from, Observable, of} from 'rxjs';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {TagColor} from '../../core/feed.service';
import {ActivatedRoute, convertToParamMap} from '@angular/router';


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
const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]
describe('SearchHomeComponent', () => {
  let component: SearchHomeComponent;
  let fixture: ComponentFixture<SearchHomeComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let interestService: jasmine.SpyObj<InterestService>;


  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser'])
    const interestSpy = jasmine.createSpyObj('InterestService', ['searchInterest'])

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ SearchHomeComponent, MockNavbarComponent, MockSidebarComponent, MockInterestListComponent],
      providers: [{provide: AuthService, useValue: authSpy},
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
    authService.getUser.and.returnValue(of({id: 1, name: 'test'}))
    interestService = TestBed.get(InterestService)
    interestService.searchInterest.and.returnValue(of(mockInterest))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
