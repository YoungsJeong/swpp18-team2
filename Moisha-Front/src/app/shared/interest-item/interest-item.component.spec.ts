import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestItemComponent } from './interest-item.component';
import {TagColor} from '../../core/feed.service';
import {Interest, InterestTag} from '../../core/interest.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('InterestItemComponent', () => {
  let component: InterestItemComponent;
  let fixture: ComponentFixture<InterestItemComponent>;
  const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
  const mockInterestTags: InterestTag[] = [
    { id: 1, name: 'tag1',  color: mockColor}
  ]
  const mockInterest: Interest[] = [
    {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ InterestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestItemComponent);
    component = fixture.componentInstance;
    component.interest = mockInterest[0]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
