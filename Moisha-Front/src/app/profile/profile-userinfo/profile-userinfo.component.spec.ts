import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserinfoComponent } from './profile-userinfo.component';

describe('ProfileUserinfoComponent', () => {
  let component: ProfileUserinfoComponent;
  let fixture: ComponentFixture<ProfileUserinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
