import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInterestComponent } from './profile-interest.component';
import {Component, Input} from '@angular/core';
import {Interest} from '../../core/interest.service';


@Component({selector: 'app-interest-item', template: ''})
class MockInterestItemComponent {
  @Input() interest: Interest[]
}
describe('ProfileInterestComponent', () => {
  let component: ProfileInterestComponent;
  let fixture: ComponentFixture<ProfileInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInterestComponent, MockInterestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
