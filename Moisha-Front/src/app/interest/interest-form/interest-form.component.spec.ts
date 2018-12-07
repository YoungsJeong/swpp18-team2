import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestFormComponent } from './interest-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {InterestService, InterestTag} from '../../core/interest.service';
import {TagColor} from '../../core/feed.service';
import {of} from 'rxjs';


const mockUser = {id: '1', name: 'test'}
const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor}
]
const mockInterestTag: InterestTag = {id: 2, name: 'tag2', color: mockColor}

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
  it('test validator', () => {
    let exceedString = '01234567890123456789'
    component.formName.setValue(exceedString)
    expect(component.formName.valid).toBeTruthy()
    exceedString += '0'
    component.formName.setValue(exceedString)
    expect(component.formName.errors.invalidName).toBeTruthy()

    exceedString = ''
    for(let i =0; i < 20; i++)
      exceedString += '0123456789'
    component.formDetail.setValue(exceedString)
    expect(component.formDetail.valid).toBeTruthy()
    exceedString += '0'
    component.formDetail.setValue(exceedString)
    expect(component.formDetail.errors.invalidDetail).toBeTruthy()

    component.formTag.setValue({id: 1, name: 'test'})
    expect(component.formTag.valid).toBeTruthy()
    component.formTag.setValue({name: 'test'})
    expect(component.formTag.errors.invalidTag).toBeTruthy()

    component.formPhotoURL.setValue('www.google.com')
    expect(component.formPhotoURL.valid).toBeTruthy()
    component.formPhotoURL.setValue('test')
    expect(component.formPhotoURL.errors.invalidURL).toBeTruthy()
  });

  it('should able to add/remove tag', () => {
    component.selectedTags = mockInterestTags
    component.remove(mockInterestTags[0])
    expect(component.selectedTags.length).toEqual(0)
    let event;
    component.selectedTags = mockInterestTags
    event = {item: mockInterestTags[0]}
    component.selected(event)
    expect(component.selectedTags.length).toEqual(1)
    event = {item: mockInterestTag}
    component.selected(event)
    expect(component.selectedTags.length).toEqual(2)
  });
  it('should emit payload', () => {
    component.formName.setValue('test')
    component.formDetail.setValue('')
    component.formPhotoURL.setValue('')
    const payload = {
      createUser: null,
      name: 'test',
      interestTags: [],
      detail: '',
      photoURL: ''
    }
    component.confirm.subscribe((result) => {
      expect(result).toEqual(payload)
    })
    component.confirmInterest()
  });
});
