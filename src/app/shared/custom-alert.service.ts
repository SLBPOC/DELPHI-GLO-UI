import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customAlert } from '../model/custom-alert';
import { Observable } from 'rxjs';
import { WellListModel } from './models/well-list';

@Injectable({
  providedIn: 'root'
})
export class CustomAlertService {
  private apiUrl: string="http://localhost:50283/";
    // httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type': 'application/json',
    //     })
    //   };
  constructor(private http: HttpClient) { }

  addCustomAlert(customAlert:customAlert):Observable<customAlert>{
    return this.http.post<customAlert>(this.apiUrl + 'api/CustomAlert/Create', customAlert);
   }
   displayDetails():Observable<customAlert[]>{
    return this.http.get<customAlert[]>(this.apiUrl + 'api/CustomAlert/Get');
  }
  deleteCustomAlert(id:number):Observable<customAlert>{
    return this.http.delete<customAlert>(this.apiUrl + 'api/CustomAlert/Delete?Id=' + id);
  }
  isActiveCustomAlert(id:number,IsActive:boolean):Observable<customAlert>{
    return this.http.put<customAlert>(this.apiUrl + 'api/CustomAlert/IsActive?Id=' + id +'&IsActive='+ IsActive,"");
  }
  getDetails(id:number):Observable<customAlert>{
    return this.http.get<customAlert>(this.apiUrl + 'api/CustomAlert/GetById?Id=' + id);
  }

  getWellName():Observable<WellListModel[]>{
    return this.http.get<WellListModel[]>(this.apiUrl + 'api/Well/GetWellName');
  }
}
