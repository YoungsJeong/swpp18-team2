import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestFeedComponent } from './interest-feed.component';

describe('InterestFeedComponent', () => {
  let component: InterestFeedComponent;
  let fixture: ComponentFixture<InterestFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
