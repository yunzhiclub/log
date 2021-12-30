import swal, {SweetAlertResult} from 'sweetalert2';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  /** 所有路由信息 */
  public routeStates: Array<{ url: string, state: { [k: string]: any } | undefined }> = [];
  /** 当前是否处于后退状态 */
  private isBack = false;

  constructor(private router: Router) {
  }

  /**
   * 操作成功提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  success(callback?: () => void, description: string = '', title: string = '操作成功', options = {confirmButtonText: '确定'}): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: 'success',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: options.confirmButtonText,
      confirmButtonColor: '#007BFF',
      showCancelButton: false
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback();
        }
      }
    });
  }

  /**
   * 清空当前路由信息
   */
  clearCurrentRoute(): void {
    this.routeStates.pop();
  }

  /** 路由后退 */
  back(url = './', route = null): void {
    /** 清空当前的路由信息 */
    this.clearCurrentRoute();
    if (this.routeStates.length > 0) {
      /** 获取待后退的url */
      const state = this.routeStates[this.routeStates.length - 1];
      /** 设置后退状态 */
      this.isBack = true;
      /** 路由跳转 */
      this.router.navigateByUrl(state.url, {state: state.state});
    } else if (route !== null) {
      this.router.navigate([url], {relativeTo: route});
    }
  }
}
