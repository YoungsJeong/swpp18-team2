import { FormGroup, ValidationErrors, FormControl } from '@angular/forms';

export class UserInfoValidator {
  static validatePasswordMismatch(group: FormGroup): ValidationErrors {
    const pwd = group.get('password').value;
    const pwdConfirm = group.get('confirmPassword').value;
    if (pwd === '' || pwdConfirm === '') {
      return null;
    }
    return pwd === pwdConfirm ? null : { passwordMismatch: true };
  }
  static validatePassword(control: FormControl): ValidationErrors {
    const { value } = control;
    if (!value || value === '') {
      return null;
    }
    const regExp = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'
    );
    return regExp.test(control.value) ? null : { invalidPassword: true };
  }

}
