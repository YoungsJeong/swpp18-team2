import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import {NgbActiveModal, NgbModal, NgbModalRef, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {ScrollBar} from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import {Article, ArticleTag, ArticleType, TagColor} from '../../core/feed.service';
import {SharedModule} from '../../shared/shared.module';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {Component, Input} from '@angular/core';

const mockColor: TagColor = {id: 1, name: 'color', rgb: '#ffffff'}
const mockTag: ArticleTag[] = [
  {id: 1, name: 'testTag', color: mockColor}
]
const mockType: ArticleType = {id: 1, name: 'testType'}
const mockArticle: Article[] = [
  {id: 1, title: 'testTitle', content: 'testContent', author: '1', type: mockType, tags: mockTag}
]


describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async(() => {
    const modalSpy = jasmine.createSpyObj('Ngbmodal', ['open'])
    TestBed.configureTestingModule({
      imports: [SharedModule, NgbModule.forRoot()],
      providers: [NgbModal, NgbActiveModal, NgbModalStack, ScrollBar],
      declarations: [ArticleComponent],
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    component.article = mockArticle[0]
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
