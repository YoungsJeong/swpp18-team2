import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFormComponent } from './article-form.component';
import {SharedModule} from '../../shared/shared.module';
import {ArticleTag, FeedService, TagColor} from '../../core/feed.service';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {observable, Observable, of} from 'rxjs';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';
const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor, noShow: false}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor, noShow: false}
]
describe('ArticleFormComponent', () => {
  let component: ArticleFormComponent;
  let fixture: ComponentFixture<ArticleFormComponent>;
  let feedService: jasmine.SpyObj<FeedService>;
  let interestService: jasmine.SpyObj<InterestService>;
  beforeEach(async(() => {
    const interestSpy = jasmine.createSpyObj('InterestService', ['getInterestByID'])
    const feedSpy = jasmine.createSpyObj('FeedService', ['searchTag'])
    TestBed.configureTestingModule({
      imports: [NgbModule.forRoot(),
        HttpClientModule,
        SharedModule],
      providers: [
        {provide: InterestService, useValue: interestSpy},
        {provide: FeedService, useValue: feedSpy}],
      declarations: [ ArticleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFormComponent);
    component = fixture.componentInstance;
    interestService = TestBed.get(InterestService)
    interestService.getInterestByID.and.returnValue(of(mockInterest[0]))
    feedService = TestBed.get(FeedService)
  });

  it('should create/ get interest with interest id', () => {
    fixture.detectChanges();
    component.interestID = 1
    expect(component).toBeTruthy();
    expect(component.selectedInterests.length).toEqual(1)
    expect(component.interestIDs.length).toEqual(1)
    interestService.getInterestByID.and.returnValue(ErrorObservable.create({status: 404}))
    component.ngOnInit()
    expect(component.errorMessage).toEqual('존재하지 않는 관심사입니다.')
    interestService.getInterestByID.and.returnValue(ErrorObservable.create({status: 400}))
    component.ngOnInit()
    expect(component.errorMessage).toEqual('구독한 관심사에만 작성할 수 있습니다.')
  })
  it('test validator', () => {
    fixture.detectChanges();
    component.formInterest.setValue({id: 1, name: 'test'})
    expect(component.formInterest.valid).toBeTruthy()
    component.formInterest.setValue({name: 'test'})
    expect(component.formInterest.errors.invalidInterest).toBeTruthy()

    component.formArticleTag.setValue({id: 1, name: 'test'})
    expect(component.formArticleTag.valid).toBeTruthy()
    component.formArticleTag.setValue({name: 'test'})
    expect(component.formArticleTag.errors.invalidArticleTag).toBeTruthy()

    let exceedString = ''
    for(let i =0; i < 8; i++)
      exceedString += '0123456789'
    component.formTitle.setValue(exceedString)
    expect(component.formTitle.valid).toBeTruthy()
    exceedString += '0'
    component.formTitle.setValue(exceedString)
    expect(component.formTitle.errors.invalidTitle).toBeTruthy()

    exceedString = ''
    for(let i =0; i < 140; i++)
      exceedString += '0123456789'
    component.formContent.setValue(exceedString)
    expect(component.formContent.valid).toBeTruthy()
    exceedString += '0'
    component.formContent.setValue(exceedString)
    expect(component.formContent.errors.invalidContent).toBeTruthy()

  });
  it('should create/ get interest without interest id', () => {
    component.interestID = 0
    fixture.detectChanges();
    expect(component.selectedInterests.length).toEqual(0)
    expect(component.interestIDs.length).toEqual(0)
  });
  it('should be able to remove interest', () => {
    fixture.detectChanges();
    component.selectedInterests = mockInterest
    component.removeInterest(mockInterest[0])
    expect(component.selectedInterests.length).toEqual(0)
  });
  it('should be able to remove article tag', () => {
    fixture.detectChanges();
    component.selectedArticleTags = mockTag
    component.removeArticleTag(mockTag[0])
    expect(component.selectedArticleTags.length).toEqual(0)
  });
  it('should be able to emit payload', () => {
    fixture.detectChanges();
    const payload = {
      author: null,
      interest: [1],
      articleTags: [],
      title: 'test',
      content: 'test'
    }
    component.formTitle.setValue('test')
    component.formContent.setValue('test')
    component.interestIDs = [1]
    component.articleTagIDs = []
    component.confirm.subscribe((result) => {
      expect(result).toEqual(payload)
    })
    component.confirmArticle()
  });
});
