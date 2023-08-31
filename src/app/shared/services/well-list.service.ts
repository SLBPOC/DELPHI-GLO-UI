import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { WellListModel } from '../models/well-list';

const wellData = '../../../../assets/json/glo-well-list.json';

@Injectable({
  providedIn: 'root',
})
export class WellListService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://localhost:50283/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getWellDetails(): Observable<any> {
    // return this.http.get<WellListModel[]>(wellData);
    return this.http.get<any[]>(this.apiUrl + 'Well');
  }
  getWellDetailsWithFilters(searchModel: any): Observable<any> {
    return this.http.post<WellListModel[]>(
      this.apiUrl + 'Well/GetWellList',
      searchModel,
      this.httpOptions
    );
  }
}
