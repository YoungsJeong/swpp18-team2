import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestHomeComponent } from './interest-home.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../core/auth.service';
import {of} from 'rxjs';


@Component({selector: 'app-navbar', template: ''})
class MockNavbarComponent {
  @Input() name: String;
  @Output() search = new EventEmitter();
}
@Component({selector: 'app-side-bar', template: ''})
class MockSidebarComponent {
}

describe('InterestHomeComponent', () => {
  let component: InterestHomeComponent;
  let fixture: ComponentFixture<InterestHomeComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser'])

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ InterestHomeComponent, MockNavbarComponent, MockSidebarComponent ],
      providers: [
        {provide: AuthService, useValue: authSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestHomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService)
    authService.getUser.and.returnValue(of({id: 1, name: 'test'}))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
