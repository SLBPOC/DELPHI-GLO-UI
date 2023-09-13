import { Injectable } from '@angular/core';
//import { WellName } from '../model/wellname';
//import { WellModel } from '../model/wellModel';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { WellGeneralInfoModel } from '../models/well-general-info-model';

const wellData = '../../assets/json-data/welllist-data.json';

@Injectable({
  providedIn: 'root'
})
export class WellsService {

  private apiUrl: string="https://localhost:50282/api/";
  private _apiUrl: string="http://localhost:50283/";
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };

  constructor(private http: HttpClient) { }

  
  getWellDetails(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + "well", this.httpOptions);          
  }

  getWellDetailsWithFilters(searchModel:any): Observable<any> {
    return this.http.post<any[]>(this.apiUrl + "Well/GetWellListByFilters", searchModel, this.httpOptions);          
  }

  getWellInfo(id:number): Observable<WellGeneralInfoModel[]> {
    return this.http.get<WellGeneralInfoModel[]>(this._apiUrl + 'WellGeneralInfo/GetById?Id='+id);
  }
}
