import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, RouterTestingModule, NgbModule.forRoot(),
      HttpClientTestingModule],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    component.name = 'name'
    fixture.detectChanges();
  });

  it('should create', () => {
    component.searchInterest()
    expect(component).toBeTruthy();
  });
  it('should be able to go to profile page', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.goToProfile()
    expect(navigateSpy).toHaveBeenCalledWith(['profile']);
  });
  it('should be able to go to home page', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.goToHome()
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
