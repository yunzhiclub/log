import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {ClientService} from "../../../service/client.service";
/**
 * 异步验证器.
 * liMingAo
 */
@Injectable({
  providedIn: 'root'
})
export class TokenAsyncValidators {
  constructor(private clientService: ClientService) {
  }
  /**
   * 验证方法，查询token是否存在
   */
  tokenNotExist(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value === '') {
        return of(null);
      }
      return this.clientService.existByToken(control.value).pipe(map(exists => exists ? {userExist: true} : null));
    };
  };
}
