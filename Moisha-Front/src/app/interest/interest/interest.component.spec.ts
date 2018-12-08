import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestComponent } from './interest.component';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {TagColor} from '../../core/feed.service';
import {of} from 'rxjs';
import {Component, Input} from '@angular/core';
const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor, noShow: false}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]
@Component({selector: 'app-interest-list', template: ''})
class MockInterestListComponent {
  @Input() interests: Interest[]
}
describe('InterestComponent', () => {
  let component: InterestComponent;
  let fixture: ComponentFixture<InterestComponent>;
  let interestService: jasmine.SpyObj<InterestService>;

  beforeEach(async(() => {
    const interestSpy = jasmine.createSpyObj('InterestService', ['getInterestTags', 'searchInterest', 'searchInterestByTag',
      'getInterestRecommendation', 'getInterestRecommendationByTag'])

    TestBed.configureTestingModule({
      declarations: [ InterestComponent, MockInterestListComponent],
      providers: [{provide: InterestService, useValue: interestSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestComponent);
    component = fixture.componentInstance;
    interestService = TestBed.get(InterestService)
    interestService.getInterestTags.and.returnValue(of(mockInterestTags))
    interestService.searchInterest.and.returnValue(of(mockInterest))
    interestService.searchInterestByTag.and.returnValue(of(mockInterest))
    interestService.getInterestRecommendation.and.returnValue(of(mockInterest))
    interestService.getInterestRecommendationByTag.and.returnValue(of(mockInterest))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
