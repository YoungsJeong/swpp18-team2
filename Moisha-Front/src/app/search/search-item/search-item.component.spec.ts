import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemComponent } from './search-item.component';
import {TagColor} from '../../core/feed.service';
import {Interest, InterestTag} from '../../core/interest.service';
import {RouterTestingModule} from '@angular/router/testing';


const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]

describe('SearchItemComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ SearchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemComponent);
    component = fixture.componentInstance;
    component.interest = mockInterest[0]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
