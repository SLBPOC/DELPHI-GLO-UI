import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateRange } from '@angular/material/datepicker';
import { AlertListService } from '../../../shared/services/alert-list.service';
import { AlertList } from '../../../shared/models/alert-list';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, map, debounceTime, distinctUntilChanged, tap } from 'rxjs'

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
  alertList!: AlertList[];
  snoozedAlerts: any = [];
  dataSource: any;
  // displayedColumns: string[] = ["stat", "WellName", "alertLevel", "TimeandDate", "AlertDescription", "alertStatus", "action"]
  displayedColumns: string[] = ["stat", "WellName", "TimeandDate", "AlertDescription", "action"]
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
  clearCount = 0;
  selectedStatus: any;
  selectedAlert: any;
  searchQueryInput: any;
  clearAlertsComments!: string;
  searchString: string = "";

  sortDirection: string = "";
  sortColumn: string = "";
  pageSize: number = 5;
  pageNumber = 1;
  skip = 0;
  currentPage = 0;
  model: any = {};
  seachByStatus: string = "";
  loading = true;
  snoozeByTime: string = '1h';
  showSnoozeDialog: boolean = false;
  totalCount: number = 0;
  OverPumping: number = 0;
  OptimalPumping: number = 0;
  UnderPumping: number = 0;
  noRecordFlag = false;

  defaultFilterPredicate?: (data: any, filter: string) => boolean;

  @Input() selectedRangeValue!: DateRange<Date>;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchQueryInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private service: AlertListService,public dialog: MatDialog) { }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    fromEvent<any>(this.searchInput.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      tap(x => this.searchString = x)
    ).subscribe(x => {
      if (x != undefined && x.trim() != "") {
        this.GetAlertDetailsWithFilters();
      }
    });
  }

  ngOnInit() {
    // this.setgridData();
    this.GetAlertDetailsWithFilters();
  }

  openDialog() {
    this.dialog.open(CustomAlertComponent);
  }
  
  GetAlertDetailsWithFilters() {
    this.loading = true;
    var SearchModel = this.createModel();
    this.service.getAlertDetailsWithFilters(SearchModel).subscribe(response => {
      if (response.hasOwnProperty('data')) {
        this.loading = false;
        this.alertList = response.data;
        // this.alertList.forEach(x => this.prepareChart(x));
        this.dataSource = new MatTableDataSource<AlertList>(this.alertList);
        if(this.dataSource.data.length == 0){
          this.noRecordFlag = true
        }
        else {
          this.noRecordFlag = false
        }
        this.getLegendCount();
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = response.totalCount;
        });

        this.totalCount = response.totalCount;
      }
    });
  }

  GetAlertListWithDateFilters(startDate : any, endDate: any) {
    this.loading = true;
    var SearchModel = this.createModel();
    this.service.getAlertDetailsWithFilters(SearchModel, startDate, endDate).subscribe(response => {
      if (response.hasOwnProperty('data')) {
        this.loading = false;
        this.alertList = response.data;
        this.dataSource = new MatTableDataSource<AlertList>(this.alertList);
        if(this.dataSource.data.length == 0){
          this.noRecordFlag = true
        }
        else {
          this.noRecordFlag = false
        }
        this.getLegendCount();
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = response.totalCount;
        });
      }
    });
  }

  //Create Model for search
  createModel(this: any) {
    this.model.pageNumber = this.pageNumber;
    this.model.pageSize = this.pageSize;
    this.model.skip = this.skip;
    this.model.searchString = this.searchString ? this.searchString : "";
    this.model.field = this.sortColumn ? this.sortColumn : "";
    this.model.dir = this.sortDirection ? this.sortDirection : "";
    this.model.status = this.seachByStatus ? this.seachByStatus : "";
    return this.model;
  }

  setgridData() {
    this.service.getWellAlerts().subscribe((resp) => {
      this.alertList = resp;
      this.dataSource = new MatTableDataSource<AlertList>(this.alertList);
      // this.defaultFilterPredicate = this.dataSource.filterPredicate;
      this.getLegendCount();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageNumber = event.pageIndex + 1;
    this.GetAlertDetailsWithFilters();
  }

  onSortChanged(e: any) {
    this.pageNumber = this.pageNumber;
    this.pageSize = this.pageSize;
    this.sortDirection = this.sort.direction;
    this.sortColumn = (typeof this.sort.active !== "undefined") ? this.sort.active : "";
    this.GetAlertDetailsWithFilters();
  }

  clearSearch() {
    this.pageNumber = 1;
    this.seachByStatus = "";
    this.searchString = "";
    this.GetAlertDetailsWithFilters();
  }

  refresh() {
    this.pageNumber = 1;
    this.seachByStatus = "";
    this.searchString = "";
    this.GetAlertDetailsWithFilters();
    this.checkSnoozedAlerts();
  }

  checkSnoozedAlerts(){
    let snoozedData = (localStorage.getItem("Snoozed Alerts"));
    console.log(snoozedData);
    // let tempSnoozeAlert = this.alertList.splice(snoozedData[0]?.Id, 1);
  }

  snoozeBy(snoozeTime: any, index: number) {
    // const payload = {
    //   alertId: snoozeTime.Id,
    //   snoozeBy: this.snoozeByTime
    // }
    // console.log('snoozyBy payload', payload + "index--> " + index)
    let tempSnoozeAlert = this.alertList.splice(index, 1);
    let obj = {
      WellName: tempSnoozeAlert[0].WellName,
      AlertLevel: tempSnoozeAlert[0].AlertLevel,
      TimeandDate: tempSnoozeAlert[0].TimeandDate,
      AlertDescription: tempSnoozeAlert[0].AlertDescription,
      AlertType: tempSnoozeAlert[0].AlertType,
      AlertStatus: tempSnoozeAlert[0].AlertStatus,
      UserId: tempSnoozeAlert[0].UserId,
      Id: tempSnoozeAlert[0].Id,
      currentTime: new Date(),
      SnoozeTime: this.snoozeByTime
    }
    this.snoozedAlerts.push(obj);
    console.log('snoozedAlerts', JSON.stringify(this.snoozedAlerts))
    this.dataSource = new MatTableDataSource<AlertList>(this.alertList);
    if(this.dataSource.data.length == 0){
      this.noRecordFlag = true
    }
    else {
      this.noRecordFlag = false
    }
    localStorage.setItem("Snoozed Alerts", JSON.stringify(this.snoozedAlerts));
    let data = (localStorage.getItem("Snoozed Alerts"));
    console.log(data);
    // console.log("clearAlertsWllName-->"+wellId.id)
    // wellId.alertLevel = "Clear"
    // console.log("clearAlerts-->"+this.dataSource)
    // this.clearAlertsComments = "";
    // debugger
    // **** Need to add service
    // this.service.snoozeBy(payload).subscribe((data: any) => {
    //   console.log('snooze by response', data);
    // })
  }

  closeSnoozeDialog(snoozeDialog: any) {
    snoozeDialog.close.emit();
  }

  clearAlerts(alert: any, comment: string) {
    console.log('clear alert', alert)
    const payload = {
      alertId: alert.alertId,
      comment: comment
    }
    console.log('clear alert', payload)
    // ** Need to add service
    // this.service.clearAlert(payload).subscribe((data: any) => {
    //   console.log('clear alert response', data);
    // })

    // console.log("clearAlertsWllName-->"+wellId.id)
    // wellId.alertLevel = "Clear"
    // console.log("clearAlerts-->"+this.dataSource)
    // this.clearAlertsComments = "";
    // debugger
  }

  closeClearAlertDialog(alertDialog: any) {
    alertDialog.close.emit();
  }

  // UI functionality

  getLegendCount() {
    let high = this.alertList.filter(alert => alert.AlertLevel == "High");
    this.highCount = high.length;

    let med = this.alertList.filter(alert => alert.AlertLevel == "Medium");
    this.medCount = med.length;

    let low = this.alertList.filter(alert => alert.AlertLevel == "Low");
    this.lowCount = low.length;

    let clear = this.alertList.filter(alert => alert.AlertLevel == "Cleared");
    this.clearCount = clear.length;
  }

  legendFilter(priority: any) {
    this.dataSource.filter = priority;
    if(this.dataSource.filteredData.length == 0){
      this.noRecordFlag = true
    }
    else {
      this.noRecordFlag = false
    }
  }

  resetDateFilters() {
    // this.dataSource.filter = '';
    this.pageNumber = 1;
    this.seachByStatus = "";
    this.searchString = "";
    let todaysDate = new Date();
    this.selectedRangeValue = new DateRange<Date>(todaysDate, null);
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }

  setDateSelected(option: any) {
    this.resetDateFilters();
    switch (option) {
      case DateRanges.DAY:
        let today = (new Date()).toISOString();
        let d = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(d.getDate() + 1);
        let tomorrowStr = tomorrow.toISOString();
        this.GetAlertListWithDateFilters(today.substring(0,10), tomorrowStr.substring(0,10));
        break;

      case DateRanges.WEEK:
        let curr = new Date(); // get current date
        let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        let last = first + 6; // last day is the first day + 6
        let firstday = (new Date(curr.setDate(first))).toISOString();
        let lastday = (new Date(curr.setDate(last))).toISOString();
        this.GetAlertListWithDateFilters(firstday.substring(0,10), lastday.substring(0,10));
        break;

      case DateRanges.MONTH:
        let date = new Date();
        let firstDay = (new Date(date.getFullYear(), date.getMonth(), 1)).toISOString();
        let lastDay = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).toISOString();
        this.GetAlertListWithDateFilters(firstDay.substring(0,10), lastDay.substring(0,10));
    }

  }

  resetDateRangeFilters() {
    // this.dataSource.filter = '';
    this.refresh();
    let todaysDate = new Date();
    this.selectedRangeValue = new DateRange<Date>(todaysDate, null);
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }

  getSelectedMonth(month: any){
    let m = month + 1;
    return m.toString().padStart(2,'0');
  }

  getSelectedDay(day: any){
    return day.toString().padStart(2,'0');
  }

  applyDateRangeFilter() {
    let fromDate = this.selectedRangeValue.start;
    let toDate = this.selectedRangeValue.end;
    let startDate = fromDate?.getFullYear() + '-' + this.getSelectedMonth(fromDate?.getMonth()) + '-' + this.getSelectedDay(fromDate?.getDate());
    let endDate = toDate?.getFullYear() + '-' + this.getSelectedMonth(toDate?.getMonth()) + '-' + this.getSelectedDay(toDate?.getDate());
    this.GetAlertListWithDateFilters(startDate,endDate);
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
