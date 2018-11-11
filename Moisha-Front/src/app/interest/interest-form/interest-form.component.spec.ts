import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestFormComponent } from './interest-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {InterestService, InterestTag} from '../../core/interest.service';
import {TagColor} from '../../core/feed.service';
import {of} from 'rxjs';


const mockUser = [{id: '1', name: 'test'}]
const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor}
]

describe('InterestFormComponent', () => {
  let component: InterestFormComponent;
  let fixture: ComponentFixture<InterestFormComponent>;
  let interestService: jasmine.SpyObj<InterestService>;

  beforeEach(async(() => {
    const interestSpy = jasmine.createSpyObj('InterestService', ['searchTag'])
    TestBed.configureTestingModule({
      imports: [NgbModule.forRoot(),
        HttpClientModule,
        SharedModule],
      declarations: [ InterestFormComponent ],
      providers: [{provide: InterestService, useValue: interestSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestFormComponent);
    component = fixture.componentInstance;
    interestService = TestBed.get(InterestService)
    interestService.searchTag.and.returnValue(of(mockInterestTags))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
