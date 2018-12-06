import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPeopleDetailComponent } from './interest-people-detail.component';
import {SharedModule} from '../../shared/shared.module';
import {TagColor} from '../../core/feed.service';
import {Interest, InterestTag} from '../../core/interest.service';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {ScrollBar} from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import {RouterTestingModule} from '@angular/router/testing';



const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]
const mockUser = {id: 1, name: 'test', nickName: 'test', studentId: 12345, college: 'test',
  major: {id:1, name: 'test'}, interests: mockInterest, email: 'test@test.com', password: 'Qwe12345'}

describe('InterestPeopleDetailComponent', () => {
  let component: InterestPeopleDetailComponent;
  let fixture: ComponentFixture<InterestPeopleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NgbModule.forRoot(), RouterTestingModule],
      providers: [NgbModal, NgbActiveModal, NgbModalStack, ScrollBar],
      declarations: [ InterestPeopleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestPeopleDetailComponent);
    component = fixture.componentInstance;
    component.user = mockUser
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
