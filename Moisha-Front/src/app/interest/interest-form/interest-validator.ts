import { ValidationErrors, FormControl } from '@angular/forms';

export class InterestValidator {
  static validateName(control: FormControl): ValidationErrors {
    const { value } = control;
    if (!value || value === '') {
      return null;
    }
    return  value.length <= 20? null : { invalidName: true };
  }
  static validateDetail(control: FormControl): ValidationErrors {
    const { value } = control;
    if (!value || value === '') {
      return null;
    }
    return  value.length <= 200? null : { invalidDetail: true };
  }
  static validatTag(control: FormControl): ValidationErrors {
    const { value } = control;
    if (!value || value === '') {
      return null;
    }
    return value.id ? null : { invalidTag: true };
  }
  static validateURL(control: FormControl): ValidationErrors {
    const { value } = control;
    if (!value || value === '') {
      return null;
    }
    const regExp = new RegExp('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?' +
      '[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$');
    return regExp.test(value) ? null : { invalidURL: true };
  }
}
