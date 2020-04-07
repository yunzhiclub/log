import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Ding} from '../norm/entity/ding';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private httpClient: HttpClient) { }

  getDing(): Observable<Ding> {
    const url = `/setting/ding`;
    return this.httpClient.get<Ding>(url);
  }

  setDing(ding: Ding): Observable<Ding> {
    const url = `/setting`;
    return this.httpClient.post<Ding>(url, ding);
  }
}
