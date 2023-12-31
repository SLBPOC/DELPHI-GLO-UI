import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import{SLBSearchParams, SortOptions } from 'src/app/model/slb-params';
import { EventList } from '../models/event-list';

const eventsData = '../../../../assets/json/events-data.json';

@Injectable({
  providedIn: 'root',
})
export class EventListService {
  _apiUrl: string = "http://localhost:50283/";
  constructor(private http: HttpClient) {}

  // getWellEvents(params: SLBSearchParams): Observable<EventList[]> {
  //   //when you get api call this
  //   //return this.http.post<AlertList[]>("url", params);
  //   //this is local setup
   
  //   return this.http.get<EventList[]>(this._apiUrl + 'api/event/').pipe(
  //     map((x) => {
  //       return this.filterData(params, x);
  //     })
  //   );
  // }
  // filterData(params: SLBSearchParams, res: EventList[]): EventList[] {
  //   if (params.searchTerm) {
  //     res = res.filter(
  //       (x) =>
  //         x.wellName.toLowerCase().includes(params.searchTerm.toLowerCase()) ||
  //         x.desc.toLowerCase().includes(params.searchTerm.toLowerCase())
  //     );
  //   }
  //   if (params.sort && params.sort.active) {
  //     res = this.transform(res, params.sort);
  //   }
  //   if (params.params && params.params.size > 0) {
  //     params.params.forEach((value: string, key: string) => {
  //       if (key == 'eventType') {
  //         res = res.filter(
  //           (c) => c.eventLevel.toLowerCase() == value?.toLowerCase()
  //         );
  //       }
  //       // if (key == 'status') {
  //       //   res = res.filter(
  //       //     (c) => c.status.toLowerCase() == value?.toLowerCase()
  //       //   );
  //       // }
  //       if (key == 'dateRange') {
  //         let dates = value.split('$');
  //         let start = dates[0],
  //           end = dates[1];
  //         res = res.filter(
  //           (c) =>
  //             new Date(c.date).getTime() >= new Date(start).getTime() &&
  //             new Date(c.date).getTime() <= new Date(end).getTime()
  //         );
  //       }
  //     });
  //   }
  //   return res;
  // }
  // transform(values: any[], sort: SortOptions): any[] {
  //   return values.sort((a, b) => {
  //     if (sort.direction == 'desc') {
  //       if (a[sort.active] < b[sort.active]) return 1;
  //       if (a[sort.active] > b[sort.active]) return -1;
  //     } else if (sort.direction == 'asc') {
  //       if (a[sort.active] < b[sort.active]) return -1;
  //       if (a[sort.active] > b[sort.active]) return 1;
  //     }
  //     return 0;
  //   }); //a[sort.active].localeCompare(b[sort.active]));
  // }
  getEventDetailsWithFilters(searchModel: any, startDate?: Date, endDate?: Date, eventType?: any, eventStatus?: any): Observable<any> {
    if (startDate && endDate) {
      return this.http.post<EventList[]>(this._apiUrl + `api/Event/GetEventList?startDate=${startDate}&endDate=${endDate}&eventType=${eventType}&eventStatus=${eventStatus}`, searchModel);       
    }
   else if (eventStatus && eventType) {
      return this.http.post<EventList[]>(this._apiUrl + `api/Event/GetEventList?startDate=${startDate}&endDate=${endDate}&eventType=${eventType}&eventStatus=${eventStatus}`, searchModel);       
    }
    else {
      return this.http.post<EventList[]>(this._apiUrl + 'api/Event/GetEventList', searchModel);
    }
  }
}
