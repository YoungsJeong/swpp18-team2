import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedListComponent } from './feed-list.component';
import {Article, ArticleTag, ArticleType, TagColor} from '../../core/feed.service';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Comment} from '../../core/reply.service';
const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor, noShow: false}
]
const mockType: ArticleType = {id: 1, name: 'testType'}
const mockArticle: Article[] = [
  {id: 1, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag}
]
@Component({selector: 'app-article', template: ''})
class MockArticleComponent {
  @Input() article: Article
}
describe('FeedListComponent', () => {
  let component: FeedListComponent;
  let fixture: ComponentFixture<FeedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedListComponent, MockArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedListComponent);
    component = fixture.componentInstance;
    component.articles = mockArticle
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
