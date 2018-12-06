import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInfoValidator} from './user-info-valitor';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-userinfo',
  templateUrl: './profile-userinfo.component.html',
  styleUrls: ['./profile-userinfo.component.css']
})
export class ProfileUserinfoComponent implements OnInit {
  @Input() user
  infoForm: FormGroup;
  constructor(public auth: AuthService,
  private fb: FormBuilder, private router: Router) { }
  duplicateEmail = true
  duplicateNickName = true
  lastCheckedNickName: string
  lastCheckedEmail: string
  error: any
  pending = false
  ngOnInit() {
    this.createForm();
    this.lastCheckedEmail = this.user.email
    this.lastCheckedNickName = this.user.nickName
  }
  createForm() {
    this.infoForm = this.fb.group(
      {
        email: [
          '',
          Validators.compose([Validators.email, Validators.required])
        ],
        nickName: ['', Validators.required],
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
    this.formEmail.setValue(this.user.email)
    this.formNickName.setValue(this.user.nickName)
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
  submitInfo() {
    this.pending = true
    this.error = false
    const payload = {
      nickName: this.formNickName.value,
      email: this.formEmail.value,
      password: this.formPassword.value
    }
    this.auth.modifyInfo(payload).subscribe({
      complete: () => {
        this.pending = false
        this.auth.getUser().subscribe()
        this.router.navigate(['/'])
      },
      error: () => {
        this.pending = false
        this.error = true
      }
    });
  }

  checkNickName(){
    event.preventDefault()
    const nickName = this.formNickName.value
    if(nickName !== this.user.nickName) {
      this.auth.checkDuplicate(nickName).subscribe(
        (result) => {
          this.duplicateNickName = result.isDuplicate
          this.lastCheckedNickName = nickName
        }
      )
    }
  }
  checkEmail() {
    event.preventDefault()
    const email = this.formEmail.value
    if(email !== this.user.email) {
      this.auth.checkDuplicate(undefined, email).subscribe(
        (result) => {
          this.duplicateEmail = result.isDuplicate
          this.lastCheckedEmail = email
        }
      )
    }
  }
}
