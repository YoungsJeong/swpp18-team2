import { ValidationErrors, FormControl } from '@angular/forms';

export class ArticleValidator {
  static validateInterest(control: FormControl): ValidationErrors {
    const { value } = control;
    if (!value || value === '') {
      return null;
    }
    return value.id ? null : { invalidInterest: true };
  }
  static validateArticleTag(control: FormControl): ValidationErrors {
    const { value } = control;
    if (!value || value === '') {
      return null;
    }
    return value.id ? null : { invalidArticleTag: true };
  }
  static validateTitle(control: FormControl): ValidationErrors {
    const { value } = control;
    if (!value || value === '') {
      return null;
    }
    return  value.length <= 80? null : { invalidtitle: true };
  }
  static validateContent(control: FormControl): ValidationErrors {
    const { value } = control;
    if (!value || value === '') {
      return null;
    }
    return  value.length <= 1400? null : { invalidContent: true };
  }
}
