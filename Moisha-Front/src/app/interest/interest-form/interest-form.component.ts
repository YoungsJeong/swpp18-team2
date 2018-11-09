import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth.service';
import {UserService} from '../../core/user.service';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {SignupValidator} from '../../signup/signup/signup-valitor';
import {InterestValidator} from './interest-validator';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {InterestService, InterestTag} from '../../core/interest.service';

@Component({
  selector: 'app-interest-form',
  templateUrl: './interest-form.component.html',
  styleUrls: ['./interest-form.component.css']
})
export class InterestFormComponent implements OnInit {
  @Output() confirm = new EventEmitter();
  interestForm: FormGroup;
  tagSearch;
  tagFormatter;
  selectedTags: InterestTag[] = [];
  tagIDs: number[] = [];
  pending: boolean;
  error: any;
  constructor(
    private fb: FormBuilder,
    private interestService: InterestService,
    private config: NgbTypeaheadConfig
  ) {
    // config.showHint = true;
    config.editable = false;
  }
  ngOnInit() {
    this.createForm();
    this.tagSearch = (text$: Observable<string>) =>
      text$.pipe(
        filter((text: string) => text && text.length > 1),
        debounceTime(10),
        distinctUntilChanged(),
        switchMap((text: string) => this.interestService.searchTag(text))
      );
    this.tagFormatter = ({ name }) => name;
  }
  createForm() {
    this.interestForm = this.fb.group(
      {
        name: [
          '',
          Validators.compose([Validators.required, InterestValidator.validateName])
        ],
        tag: [
          null,
          Validators.compose([InterestValidator.validatTag])
        ],
        detail: ['', Validators.compose([InterestValidator.validateDetail])],
        photoURL: ['', Validators.compose([InterestValidator.validateURL])]
      },
      {
        updateOn: 'change'
      }
    );
  }
  selected($event) {
    let isFound = false
    this.selectedTags.forEach( (item, index) => {
      if(item.id === $event.item.id) isFound = true
    });
    if(!isFound)  {
      this.selectedTags.push($event.item)
      this.tagIDs.push($event.item.id)
    }
  }
  remove(tag) {
    this.selectedTags = this.selectedTags.filter((t) => t.id !== tag.id)
  }
  get formName() {
    return this.interestForm.get('name')
  }
  get formDetail() {
    return this.interestForm.get('detail')
  }
  get formTag() {
    return this.interestForm.get('tag')
  }
  get formPhotoURL() {
    return this.interestForm.get('photoURL')
  }
  confirmInterest() {
    const payload = {
      createUser: null,
      name: this.formName.value,
      interestTags: this.tagIDs,
      detail: this.formDetail.value,
      photoURL: this.formPhotoURL.value
    };
    this.confirm.emit(payload);
  }

}
