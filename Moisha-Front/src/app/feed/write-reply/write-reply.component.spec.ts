import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReplyComponent } from './write-reply.component';

describe('WriteReplyComponent', () => {
  let component: WriteReplyComponent;
  let fixture: ComponentFixture<WriteReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
