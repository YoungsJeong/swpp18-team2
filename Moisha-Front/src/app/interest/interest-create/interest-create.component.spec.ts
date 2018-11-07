import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestCreateComponent } from './interest-create.component';

describe('InterestCreateComponent', () => {
  let component: InterestCreateComponent;
  let fixture: ComponentFixture<InterestCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
