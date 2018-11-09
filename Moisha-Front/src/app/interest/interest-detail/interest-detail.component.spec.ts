import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestDetailComponent } from './interest-detail.component';

describe('InterestDetailComponent', () => {
  let component: InterestDetailComponent;
  let fixture: ComponentFixture<InterestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
