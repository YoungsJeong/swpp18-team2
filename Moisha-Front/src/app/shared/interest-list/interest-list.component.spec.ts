import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestListComponent } from './interest-list.component';
import {TagColor} from '../../core/feed.service';
import {Interest, InterestTag} from '../../core/interest.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, Input, OnInit} from '@angular/core';

describe('InterestListComponent', () => {
  let component: InterestListComponent;
  let fixture: ComponentFixture<InterestListComponent>;
  const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
  const mockInterestTags: InterestTag[] = [
    { id: 1, name: 'tag1',  color: mockColor}
  ]
  const mockInterest: Interest[] = [
    {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
  ]
  @Component({selector: 'app-interest-item', template: ''})
  class MockInterestItemComponent {
    @Input() interest: Interest
    constructor() { }
  }
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
