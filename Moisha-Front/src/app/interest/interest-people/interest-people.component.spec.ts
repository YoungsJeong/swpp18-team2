import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPeopleComponent } from './interest-people.component';
import {TagColor} from '../../core/feed.service';
import {Interest, InterestTag} from '../../core/interest.service';
import {SharedModule} from '../../shared/shared.module';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {ScrollBar} from '@ng-bootstrap/ng-bootstrap/util/scrollbar';



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

describe('InterestPeopleComponent', () => {
  let component: InterestPeopleComponent;
  let fixture: ComponentFixture<InterestPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NgbModule.forRoot()],
      providers: [NgbModal, NgbActiveModal, NgbModalStack, ScrollBar],
      declarations: [ InterestPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestPeopleComponent);
    component = fixture.componentInstance;
    component.user = mockUser
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
