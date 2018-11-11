import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestCreateComponent } from './interest-create.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../core/auth.service';
import {Article, FeedService} from '../../core/feed.service';
import {InterestService} from '../../core/interest.service';
import {of} from 'rxjs';
import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({selector: 'app-interest-form', template: ''})
class MockInterestFormComponent {
  @Output() confirm = new EventEmitter();
}

describe('InterestCreateComponent', () => {
  let component: InterestCreateComponent;
  let fixture: ComponentFixture<InterestCreateComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let interestService: jasmine.SpyObj<InterestService>;

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser'])
    const interestSpy = jasmine.createSpyObj('InterestService',['createInterest'])
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ InterestCreateComponent, MockInterestFormComponent ],
      providers: [{provide: AuthService, useValue: authSpy},
        {provide: InterestService, useValue: interestSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestCreateComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService)
    interestService = TestBed.get(InterestService)
    authService.getUser.and.returnValue(of({id: 1, name: 'test'}))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
