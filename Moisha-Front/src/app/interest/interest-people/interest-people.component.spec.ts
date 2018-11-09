import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPeopleComponent } from './interest-people.component';

describe('InterestPeopleComponent', () => {
  let component: InterestPeopleComponent;
  let fixture: ComponentFixture<InterestPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
