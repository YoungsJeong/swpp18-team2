import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInfoValidator} from './user-info-valitor';

@Component({
  selector: 'app-profile-userinfo',
  templateUrl: './profile-userinfo.component.html',
  styleUrls: ['./profile-userinfo.component.css']
})
export class ProfileUserinfoComponent implements OnInit {
  @Input() user
  infoForm: FormGroup;
  constructor(public auth: AuthService,
  private fb: FormBuilder) { }
  duplicateEmail = false
  duplicateNickName = false
  duplicateStudentId = false
  error: false
  ngOnInit() {
    this.createForm();
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser().subscribe(console.log);
  }
  createForm() {
    this.infoForm = this.fb.group(
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
            UserInfoValidator.validateStudentId
          ])
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            UserInfoValidator.validatePassword
          ])
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: UserInfoValidator.validatePasswordMismatch,
        updateOn: 'change'
      }
    );
  }
  get formNickName() {
    return this.infoForm.get('nickName')
  }
  get formEmail() {
    return this.infoForm.get('email')
  }
  get formPassword() {
    return this.infoForm.get('password')
  }
  get formConfirmPassword() {
    return this.infoForm.get('confirmPassword')
  }
  get formStudentId() {
    return this.infoForm.get('studentId')
  }
  submitInfo() {

  }
  checkStudentId() {
    event.preventDefault()
    this.duplicateStudentId = !this.duplicateStudentId
  }
  checkNickName(){
    event.preventDefault()
    this.duplicateNickName = !this.duplicateNickName
  }
  checkEmail() {
    event.preventDefault()
    this.duplicateEmail = !this.duplicateEmail
    alert(this.infoForm.invalid)
  }
}
