import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPeopleDetailComponent } from './interest-people-detail.component';

describe('InterestPeopleDetailComponent', () => {
  let component: InterestPeopleDetailComponent;
  let fixture: ComponentFixture<InterestPeopleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestPeopleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestPeopleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
