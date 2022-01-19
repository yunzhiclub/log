import {AbstractControl, ValidationErrors} from '@angular/forms';

/**
 * 用户名验证器
 */
export class UsernameValidator {
  static username(control: AbstractControl): ValidationErrors | null {
    const username = control.value as string;
    if(username.length) {
      if (username.length >= 6 && username.length <= 11) {
        // 验证只包含数字和字母
        for (let i = 0; i < username.length; i++) {
          let ascii = username[i].charCodeAt(0) as number;
          if (!(ascii >= 48 && ascii <= 57 || ascii >= 97 && ascii <= 122 || ascii >= 65 && ascii <= 90)) {
            return {username: '用户名只能包含数字和字母'}
          }
        }
        return null;
      } else {
        return {username: '用户名长度必须大于等于6小于等于11'}
      }
    }
    return null;
  }

}
