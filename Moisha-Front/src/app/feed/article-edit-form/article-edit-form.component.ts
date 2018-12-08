import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InterestService} from '../../core/interest.service';
import {Article, FeedService} from '../../core/feed.service';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {ArticleValidator} from '../article-form/article-validator';

@Component({
  selector: 'app-article-edit-form',
  templateUrl: './article-edit-form.component.html',
  styleUrls: ['./article-edit-form.component.css']
})
export class ArticleEditFormComponent implements OnInit {
  @Input() article: Article
  @Output() confirm = new EventEmitter();
  articleForm: FormGroup;
  interestSearch;
  articleTagSearch;
  interestFormatter;
  articleTagFormatter;
  selectedInterests = [];
  selectedArticleTags = [];
  interestIDs: number[] = [];
  articleTagIDs: number[] = [];
  pending: boolean;
  error: any;
  errorMessage;
  constructor(
    private fb: FormBuilder,
    private feedService: FeedService,
    private config: NgbTypeaheadConfig
  ) {
    // config.showHint = true;
    config.editable = false;
  }
  ngOnInit() {
    this.interestIDs.push(this.article.interest.id)
    this.selectedInterests.push(this.article.interest)
    this.createForm();
    this.setValue()
    this.selectedArticleTags = this.article.tags
    for(const tag of this.article.tags)
      this.articleTagIDs.push(tag.id)
    this.interestFormatter = ({ name }) => name;
    this.articleTagSearch = (text$: Observable<string>) =>
      text$.pipe(
        filter((text: string) => text && text.length >= 0),
        debounceTime(10),
        distinctUntilChanged(),
        switchMap((text: string) => this.feedService.searchTag(text))
      );
    this.articleTagFormatter = ({ name }) => name;
  }
  setValue() {
    this.formTitle.setValue(this.article.title)
    this.formContent.setValue(this.article.content)
  }
  createForm() {
    this.articleForm = this.fb.group(
      {
        articleTag: [
          null, Validators.compose([ArticleValidator.validateArticleTag])
        ],
        title: [
          '',
          Validators.compose([Validators.required, ArticleValidator.validateTitle])
        ],
        content: [
          '',
          Validators.compose([Validators.required, ArticleValidator.validateContent])]
      },
      {
        updateOn: 'change'
      }
    );
  }
  articleTagSelected($event) {
    let isFound = false
    this.selectedArticleTags.forEach((item, index) => {
      if (item.id === $event.item.id) isFound = true
    });
    if (!isFound) {
      this.selectedArticleTags.push($event.item)
      this.articleTagIDs.push($event.item.id)
    }
  }
  removeArticleTag(article) {
    this.selectedArticleTags  = this.selectedArticleTags.filter((t) => t.id !== article.id)
  }
  get formInterest() {
    return this.articleForm.get('interest')
  }
  get formArticleTag() {
    return this.articleForm.get('articleTag')
  }
  get formTitle() {
    return this.articleForm.get('title')
  }
  get formContent() {
    return this.articleForm.get('content')
  }
  confirmArticle() {
    const payload = {
      author: null,
      articleId: this.article.id,
      interest: this.article.interest.id,
      articleTags: this.articleTagIDs,
      title: this.formTitle.value,
      content: this.formContent.value
    };
    this.confirm.emit(payload);
  }

}
