 import {Injectable} from "@angular/core";
 import {UserService} from "../../../service/user.service";
 import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
 import {Observable, of} from "rxjs";
 import {map} from "rxjs/operators";
 /**
  * 异步验证器.
  * liMingAo
  */
@Injectable({
  providedIn: 'root'
})
export class UserAsyncValidators {
  constructor(private userService: UserService) {
  }
   /**
    * 验证方法，查询用户是否存在
    */
   userNotExist(): AsyncValidatorFn {
     return (control: AbstractControl): Observable<ValidationErrors | null> => {
       if (control.value === '') {
         return of(null);
       }
       return this.userService.existByUsername(control.value).pipe(map(exists => exists ? {userExist: true} : null));
     };
   };
}
