import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPeopleListComponent } from './interest-people-list.component';
import {Component, Input} from '@angular/core';


@Component({selector: 'app-interest-people', template: ''})
class MockInterestPeopleComponent {
  @Input() user
}
const mockUser = [{id: '1', name: 'test'}]

describe('InterestPeopleListComponent', () => {
  let component: InterestPeopleListComponent;
  let fixture: ComponentFixture<InterestPeopleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestPeopleListComponent, MockInterestPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestPeopleListComponent);
    component = fixture.componentInstance;
    component.users = mockUser
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
