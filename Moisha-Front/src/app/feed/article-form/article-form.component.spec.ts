import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFormComponent } from './article-form.component';
import {SharedModule} from '../../shared/shared.module';
import {FeedService} from '../../core/feed.service';
import {InterestService} from '../../core/interest.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

describe('ArticleFormComponent', () => {
  let component: ArticleFormComponent;
  let fixture: ComponentFixture<ArticleFormComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule.forRoot(),
        HttpClientModule,
        SharedModule],
      providers: [
        InterestService,
        FeedService],
      declarations: [ ArticleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
