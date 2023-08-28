import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ParameterGraphModel } from '../models/parameterGraphModel';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private apiUrl: string="http://localhost:61209/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  yesterdayCycleCountJson = '../../../../assets/json/yesterday-cycle-count-data.json';
  yesterdayCycleCountBarJson = '../../../../assets/json/yesterday-cycle-count-bar-data.json'
  CounterJsonUrl='../../../../assets/json/cyclecounter.json';
  runtimeJsonUrl='../../../../assets/json/cycleruntime.json';
  constructor(private http: HttpClient) { }

  getYesterdayCycleCountData(): Observable<any>{
    return this.http.get(this.yesterdayCycleCountJson);
  }

  getYesterdayCycleCountBarData(): Observable<any>{
    return this.http.get(this.yesterdayCycleCountBarJson);
  }

  GetCycleCounter(): Observable<ParameterGraphModel[]> {   
    return this.http.get<ParameterGraphModel[]>(this.CounterJsonUrl);          
  }

  GetCycleRun(): Observable<ParameterGraphModel[]> {   
    return this.http.get<ParameterGraphModel[]>(this.runtimeJsonUrl);          
  }

  GetParameterChart(id:any): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + "well/GetWellParams?Id=" + id, this.httpOptions);          
  }
  
}
