import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestHomeComponent } from './interest-home.component';

describe('InterestHomeComponent', () => {
  let component: InterestHomeComponent;
  let fixture: ComponentFixture<InterestHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
