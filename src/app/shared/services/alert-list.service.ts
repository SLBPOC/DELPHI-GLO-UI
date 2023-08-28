import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertList } from '../models/alert-list';
import { Observable } from 'rxjs';


const alertsData = '../../../../assets/json/alerts-data.json';

@Injectable({
  providedIn: 'root'
})
export class AlertListService {

  _apiUrl: string = "http://localhost:50283/";
  constructor(private http: HttpClient) { }

  getWellAlerts(): Observable<AlertList[]> {
    //return this.http.get<AlertList[]>(alertsData);
    return this.http.get<AlertList[]>(this._apiUrl + 'api/alerts/');
  }

}
