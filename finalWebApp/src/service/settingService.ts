import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ding} from '../entity/ding';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  constructor(private httpClient: HttpClient) { }
  protected url = 'setting';
  getDing(): Observable<Ding> {
    const url = `/setting/ding`;
    return this.httpClient.get<Ding>(url);
  }

  setDing(ding: Ding): Observable<Ding> {
    const url = `/setting`;
    return this.httpClient.post<Ding>(url, ding);
  }
  /**
   * 新增
   */
  save(ding: Ding): Observable<Ding> {
    return this.httpClient.post<Ding>(`${this.url}`,ding)
      .pipe(map(data => new Ding(data)));
  }
}
