import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  filter,
  switchMap,
  distinctUntilChanged
} from 'rxjs/operators';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../core/user.service';
import {SignupValidator} from './signup-valitor';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  search;
  formatter;
  pending: boolean;
  error: any;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private config: NgbTypeaheadConfig
  ) {
    // config.showHint = true;
    config.editable = false;
  }

  ngOnInit() {
    this.createForm();
    this.search = (text$: Observable<string>) =>
      text$.pipe(
        filter((text: string) => text && text.length > 1),
        debounceTime(10),
        distinctUntilChanged(),
        switchMap((text: string) => this.userService.searchDepartment(text))
      );
    this.formatter = ({ name }) => name;
  }

  createForm() {
    this.signUpForm = this.fb.group(
      {
        email: [
          '',
          Validators.compose([Validators.email, Validators.required])
        ],
        name: ['', Validators.required],
        nickName: ['', Validators.required],
        studentId: [
          '',
          Validators.compose([
            Validators.required,
            SignupValidator.validateStudentId
          ])
        ],
        major: [
          null,
          Validators.compose([
            Validators.required,
            SignupValidator.validateDepartment
          ])
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            SignupValidator.validatePassword
          ])
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: SignupValidator.validatePasswordMismatch,
        updateOn: 'change'
      }
    );
  }
  signUpRequest() {
    this.pending = true
    this.error = false
    const transformToInteger = Number.parseInt(
      this.formStudentId.value.replace('-', '')
    );
    const payload = {
      name: this.formName.value,
      nickName: this.formNickName.value,
      studentId: transformToInteger,
      major: this.formMajor.value && this.formMajor.value.id,
      email: this.formEmail.value,
      password: this.formPassword.value
    };
    this.auth.signup(payload).subscribe({
      complete: () => {
        this.pending = false
      },
      error: () => {
        this.pending = false
        this.error = true
      }
    });
  }

  get formName() {
    return this.signUpForm.get('name')
  }
  get formNickName() {
    return this.signUpForm.get('nickName')
  }
  get formEmail() {
    return this.signUpForm.get('email')
  }
  get formPassword() {
    return this.signUpForm.get('password')
  }
  get formConfirmPassword() {
    return this.signUpForm.get('confirmPassword')
  }
  get formMajor() {
    return this.signUpForm.get('major')
  }
  get formStudentId() {
    return this.signUpForm.get('studentId')
  }
}
