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

  getAlertDetailsWithFilters(searchModel:any, pageIndex?: number, pageSize?: number, searchString?: string, startDate?: Date, endDate?: Date): Observable<any> {
    if(startDate && endDate)
    {
      return this.http.post<AlertList[]>(this._apiUrl + 
        `api/Alerts/GetAlertsList?pageIndex=${pageIndex}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,searchModel);
       
    }
    else if (searchString != "") {
      return this.http.post<AlertList[]>(this._apiUrl + 
        `api/Alerts/GetAlertsList?pageIndex=${pageIndex}&pageSize=${pageSize}&searchString=${searchString}`,searchModel);
    }
    else {
      return this.http.post<AlertList[]>(this._apiUrl + `api/Alerts/GetAlertsList?pageIndex=${pageIndex}&pageSize=${pageSize}`,searchModel);
    }
  }

  getSnoozedAlerts(alertId: number, snoozeBy: number, searchModel?: any): Observable<any> {
    return this.http.post<AlertList[]>(this._apiUrl + `api/Alerts/GetSnoozeByAlert?alertId=${alertId}&snoozeBy=${snoozeBy}`, searchModel);
  }

  clearAlerts(alertId: number, comment: string, searchModel?: any): Observable<any> {
    return this.http.post<AlertList[]>(this._apiUrl + `api/Alerts/ClearAlert?alertId=${alertId}&comment=${comment}`, searchModel);
  }

}
