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
    return this.http.get<AlertList[]>(alertsData);
    // return this.http.get<AlertList[]>(this._apiUrl + 'api/alerts/');
  }

  getAlertDetailsWithFilters(searchModel:any, startDate?: Date, endDate?: Date): Observable<any> {
    if(startDate && endDate){
      return this.http.post<AlertList[]>(this._apiUrl + `api/Alerts/GetAlertsList?startDate=${startDate}&endDate=${endDate}`, searchModel); 
      // http://localhost:50283/api/Alerts/GetAlertsList?startDate=2023-08-20&endDate=2023-08-24         
    }
    else {
      return this.http.post<AlertList[]>(this._apiUrl + 'api/Alerts/GetAlertsList', searchModel);          
    }
  }

  getSnoozedAlerts(alertId: number, snoozeBy: string, searchModel?: any): Observable<any> {
    return this.http.post<AlertList[]>(this._apiUrl + `api/Alerts/GetSnoozeByAlert?alertId=${alertId}&snoozeBy=${snoozeBy}`, searchModel);
  }

  clearAlerts(alertId: number, comment: string, searchModel?: any): Observable<any> {
    return this.http.post<AlertList[]>(this._apiUrl + `api/Alerts/ClearAlert?alertId=${alertId}&comment=${comment}`, searchModel);
  }

}
