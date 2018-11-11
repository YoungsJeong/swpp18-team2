import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListComponent } from './search-list.component';
import {Component, Input} from '@angular/core';
import {Interest, InterestTag} from '../../core/interest.service';
import {TagColor} from '../../core/feed.service';


const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]

@Component({selector: 'app-search-item', template: ''})
class MockSearchLItemComponent {
  @Input() interest: Interest
}

describe('SearchListComponent', () => {
  let component: SearchListComponent;
  let fixture: ComponentFixture<SearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchListComponent, MockSearchLItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListComponent);
    component = fixture.componentInstance;
    component.interests = mockInterest
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
