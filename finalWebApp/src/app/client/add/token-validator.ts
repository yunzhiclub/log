import {AbstractControl, ValidationErrors} from '@angular/forms';

/**
 * token验证器
 */
export class tokenValidator {
  static token(control: AbstractControl): ValidationErrors | null {
    const token = control.value as string;
      // 验证只包含数字和字母
      for (let i = 0; i < token.length; i++) {
        let ascii = token[i].charCodeAt(0) as number;
        if (!(ascii >= 48 && ascii <= 57 || ascii >= 97 && ascii <= 122 || ascii >= 65 && ascii <= 90)) {
          return {token: 'token只能包含数字和字母'}
        }
      }
      return null;
    }
}

