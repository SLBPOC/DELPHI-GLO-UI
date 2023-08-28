import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateRange } from '@angular/material/datepicker';
import { AlertListService } from '../../../shared/services/alert-list.service';
import { AlertList } from '../../../shared/models/alert-list';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';

interface Option {
  id: string;
  value: string;
}

enum DateRanges {
  DAY = 1,
  WEEK = 2,
  MONTH = 3,
}

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent {
  wellList!: AlertList[];
  dataSource: any;
  displayedColumns: string[] = ["stat", "wellName", "alertLevel", "timeandDate", "alertDescription", "alertStatus", "action"]
  alertTypes: Option[] = [
    { id: '1', value: 'High' },
    { id: '2', value: 'Medium' },
    { id: '3', value: 'Low' }
  ];
  statuses: Option[] = [
    { id: '1', value: 'Completed' },
    { id: '2', value: 'In Progress' }
  ];
  highCount = 0;
  medCount = 0;
  lowCount = 0;
  selectedStatus: any;
  selectedAlert: any;
  searchQueryInput: any;
  clearAlertsComments!: string;
  defaultFilterPredicate?: (data: any, filter: string) => boolean;

  @Input() selectedRangeValue!: DateRange<Date>;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AlertListService) { }

  ngOnInit() {
    this.setgridData();
  }

  setgridData(){
    this.service.getWellAlerts().subscribe((resp) => {
      this.wellList = resp;
      this.dataSource = new MatTableDataSource<AlertList>(this.wellList);
      // this.defaultFilterPredicate = this.dataSource.filterPredicate;
      this.getLegendCount();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getLegendCount() {
    let high = this.wellList.filter(alert => alert.alertLevel == "High");
    this.highCount = high.length;

    let med = this.wellList.filter(alert => alert.alertLevel == "Medium");
    this.medCount = med.length;

    let low = this.wellList.filter(alert => alert.alertLevel == "Low");
    this.lowCount = low.length;
  }

  legendFilter(priority: any){
    this.dataSource.filter = priority;
  }

  search(data: Event) {
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val;

  }

  refresh() {
    this.dataSource = new MatTableDataSource<AlertList>(this.wellList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.searchQueryInput = null;
  }

  alertChange(event: any) {
    let filterValue;
    filterValue = event.value.trim(); // Remove whitespace
    filterValue = event.value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  statusChange(event: any) {
    let filterValue;
    filterValue = event.value.trim(); // Remove whitespace
    filterValue = event.value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  snoozeBy(time: any){

  }

  clearAlerts(wellId: any){
    console.log("clearAlerts-->"+this.clearAlertsComments)
    // console.log("clearAlertsWllName-->"+wellId.id)
    // wellId.alertLevel = "Clear"
    // console.log("clearAlerts-->"+this.dataSource)
    // this.clearAlertsComments = "";
    // debugger
  }

  applyFilter() {
    this.dataSource.filterPredicate = (data: any) => {
      if (this.selectedStatus && this.selectedAlert) {
        return data.status == this.selectedStatus && data.alertLevel == this.selectedAlert;
      }
      return true;
    }
  }

  setDateSelected(option: any) {
    this.resetDateRangeFilters();
    switch (option) {
      case DateRanges.DAY:
        let today = (new Date()).toISOString();
        const filterValue = today.substring(0, 10);
        this.dataSource.filter = filterValue.trim().toLowerCase();
        break;

      case DateRanges.WEEK:
        let curr = new Date(); // get current date
        let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        let last = first + 6; // last day is the first day + 6
        let firstday = (new Date(curr.setDate(first))).toISOString();
        let lastday = (new Date(curr.setDate(last))).toISOString();
        this.dataSource.filterPredicate = (data: any) => {
          if (firstday && lastday) {
            return data.date >= firstday && data.date <= lastday;
          }
          return true;
        }
        this.dataSource.filter = '' + Math.random();
        break;

      case DateRanges.MONTH:
        let date = new Date();
        let firstDay = (new Date(date.getFullYear(), date.getMonth(), 1)).toISOString();
        let lastDay = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).toISOString();
        this.dataSource.filterPredicate = (data: any) => {
          if (firstDay && lastDay) {
            return data.date >= firstDay && data.date <= lastDay;
          }
          return true;
        }
        this.dataSource.filter = '' + Math.random();
        break;
    }

  }

  resetDateRangeFilters() {
    // this.dataSource.filter = '';
    this.refresh();
    let todaysDate = new Date();
    this.selectedRangeValue = new DateRange<Date>(todaysDate, null);
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }

  applyDateRangeFilter() {
    let fromDate = this.selectedRangeValue.start?.toISOString();
    let toDate = this.selectedRangeValue.end?.toISOString()
    this.dataSource.filterPredicate = (data: any) => {
      if (fromDate && toDate) {
        return data.date >= fromDate && data.date <= toDate;
      }
      return true;
    }
    this.dataSource.filter = '' + Math.random();
  }

  selectedChange(m: any) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }

}
