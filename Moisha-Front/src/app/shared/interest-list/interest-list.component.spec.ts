import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestListComponent } from './interest-list.component';
import {TagColor} from '../../core/feed.service';
import {Interest, InterestTag} from '../../core/interest.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, Input, OnInit} from '@angular/core';
import {of} from 'rxjs';


const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor, noShow: false}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags},
  {id: 2, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags},
  {id: 3, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags},
  {id: 4, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags},
  {id: 5, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags},
  {id: 6, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags},
  {id: 7, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags},
  {id: 8, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags},
  {id: 9, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags},
  {id: 10, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags},
]
@Component({selector: 'app-interest-item', template: ''})
class MockInterestItemComponent {
  @Input() interest: Interest
  constructor() { }
}
describe('InterestListComponent', () => {
  let component: InterestListComponent;
  let fixture: ComponentFixture<InterestListComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ InterestListComponent, MockInterestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestListComponent);
    component = fixture.componentInstance;
    component.interests = mockInterest
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
