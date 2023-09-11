import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AlertList } from '../models/alert-list';
import { Observable } from 'rxjs';

const wellCycleData = '../../../../assets/json/well-cycle-status-data.json';

@Injectable({
  providedIn: 'root'
})
export class WellDetailViewService {

  _apiUrl: string = "http://localhost:50283/";
  constructor(private http: HttpClient) { }

  getWellCycles(): Observable<any[]> {
    return this.http.get<any[]>(wellCycleData);
    // return this.http.get<AlertList[]>(this._apiUrl + 'api/alerts/');
  }
}
