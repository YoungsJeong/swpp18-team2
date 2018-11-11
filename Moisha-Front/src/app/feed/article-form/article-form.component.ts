import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {AuthService} from '../../core/auth.service';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {InterestValidator} from '../../interest/interest-form/interest-validator';
import {ArticleTag, FeedService} from '../../core/feed.service';
import {ArticleValidator} from './article-validator';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  @Input() interestID
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
    private interestService: InterestService,
    private feedService: FeedService,
    private config: NgbTypeaheadConfig
  ) {
    // config.showHint = true;
    config.editable = false;
  }
  ngOnInit() {
    if(this.interestID !== 0) {
      this.interestIDs.push(this.interestID)
      this.interestService.getInterestByID(this.interestID, true).subscribe((result) => {
          this.selectedInterests.push(result)
      }, (error) => {
        if (error.status === 404)
          this.errorMessage = '존재하지 않는 관심사입니다.'
        else if (error.status === 400)
          this.errorMessage = '구독한 관심사에만 작성할 수 있습니다.'
      })
    }
    this.createForm();
    this.interestSearch = (text$: Observable<string>) =>
      text$.pipe(
        filter((text: string) => text && text.length > 1),
        debounceTime(10),
        distinctUntilChanged(),
        switchMap((text: string) => this.interestService.searchInterestByUser(text))
      );
    this.interestFormatter = ({ name }) => name;
    this.articleTagSearch = (text$: Observable<string>) =>
      text$.pipe(
        filter((text: string) => text && text.length > 1),
        debounceTime(10),
        distinctUntilChanged(),
        switchMap((text: string) => this.feedService.searchTag(text))
      );
    this.articleTagFormatter = ({ name }) => name;
  }
  createForm() {
    this.articleForm = this.fb.group(
      {
        interest: [
          null, Validators.compose([ArticleValidator.validateInterest])
        ],
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
  interestSelected($event) {
    let isFound = false
    this.selectedInterests.forEach( (item, index) => {
      if(item.id === $event.item.id) isFound = true
    });
    if(!isFound)  {
      this.selectedInterests.push($event.item)
      this.interestIDs.push($event.item.id)
    }
  }
  articleTagSelected($event) {
    let isFound = false
    this.selectedArticleTags.forEach( (item, index) => {
      if(item.id === $event.item.id) isFound = true
    });
    if(!isFound)  {
      this.selectedArticleTags.push($event.item)
      this.articleTagIDs.push($event.item.id)
    }
  }
  removeInterest(interest) {
    this.selectedInterests = this.selectedInterests.filter((t) => t.id !== interest.id)
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
      interest: this.interestIDs,
      articleTags: this.articleTagIDs,
      title: this.formTitle.value,
      content: this.formContent.value
    };
    this.confirm.emit(payload);
  }

}
