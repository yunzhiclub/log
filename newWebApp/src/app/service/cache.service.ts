import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private static authToken: string = sessionStorage.getItem('authToken');
  constructor() { }
  static setAuthToken(token: string) {
    CacheService.authToken = token;
    sessionStorage.setItem('authToken', token);
  }
  static getAuthToken() {
    if (CacheService.authToken === null) {
      return '';
    }
    return CacheService.authToken;
    }
}
