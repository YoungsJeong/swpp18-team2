import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPeopleListComponent } from './interest-people-list.component';

describe('InterestPeopleListComponent', () => {
  let component: InterestPeopleListComponent;
  let fixture: ComponentFixture<InterestPeopleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestPeopleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestPeopleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
