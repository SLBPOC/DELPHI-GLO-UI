import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateRange } from '@angular/material/datepicker';
import { AlertListService } from '../../../shared/services/alert-list.service';
import { AlertList } from '../../../shared/models/alert-list';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, map, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  styleUrls: ['./alert-list.component.scss'],
})
export class AlertListComponent {
  alertList!: AlertList[];
  dataSource: any;
  // displayedColumns: string[] = ["stat", "WellName", "alertLevel", "TimeandDate", "AlertDescription", "alertStatus", "action"]
  displayedColumns: string[] = [
    'stat',
    'WellName',
    'TimeandDate',
    'AlertDescription',
    'action',
  ];
  highCount = 0;
  medCount = 0;
  lowCount = 0;
  clearCount = 0;
  searchQueryInput: any;
  clearAlertsComments!: string;
  searchString: string = '';

  sortDirection: string = '';
  sortColumn: string = '';
  pageSize: number = 5;
  pageNumber = 1;
  skip = 0;
  currentPage = 0;
  model: any = [];
  seachByStatus: string = '';
  loading = true;
  snoozeByTime: number = 1;
  showSnoozeDialog: boolean = false;
  totalCount: number = 0;

  defaultFilterPredicate?: (data: any, filter: string) => boolean;

  @Input() selectedRangeValue!: DateRange<Date>;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchQueryInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private service: AlertListService,
    public dialog: MatDialog,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    fromEvent<any>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event) => event.target.value),
        debounceTime(500),
        distinctUntilChanged(),
        tap((x) => (this.searchString = x))
      )
      .subscribe((x) => {
        if (x != undefined && x.trim() != '') {
          this.GetAlertDetailsWithFilters();
        }
      });
  }

  ngOnInit() {
    // this.setgridData();
    this._route.params.subscribe((params) => {
      this.searchString = params['WellName'];
    });
    this.GetAlertDetailsWithFilters();
  }

  openDialog() {
    this.dialog.open(CustomAlertComponent);
  }

  GetAlertDetailsWithFilters() {
    this.loading = true;
    this.model = [];
    var SearchModel = this.createModel();
    this.service
      .getAlertDetailsWithFilters(
        SearchModel,
        this.pageNumber,
        this.pageSize,
        this.searchString
      )
      .subscribe(
        (response) => {
          if (response.status != 404) {
            this.loading = false;
            this.alertList = response.data;
            this.dataSource = new MatTableDataSource<AlertList>(this.alertList);
            this.getLegendCount();
            this.moveClearAlertsToBottom();
            setTimeout(() => {
              this.paginator.pageIndex = this.currentPage;
              this.paginator.length = response.totalCount;
            });

            this.totalCount = response.totalCount;
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = response.totalCount;
          }
        },
        (err) => {
          this.loading = false;
          this.alertList = [];
          this.dataSource = new MatTableDataSource<AlertList>(this.alertList);
        }
      );
  }

  GetAlertListWithDateFilters(startDate: any, endDate: any) {
    this.loading = true;
    this.model = [];
    var SearchModel = this.createModel();
    this.service
      .getAlertDetailsWithFilters(
        SearchModel,
        this.pageNumber,
        this.pageSize,
        this.searchString,
        startDate,
        endDate
      )
      .subscribe(
        (response) => {
          if (response.status != 404) {
            this.loading = false;
            this.alertList = response.data;
            this.dataSource = new MatTableDataSource<AlertList>(this.alertList);
            this.getLegendCount();
            this.moveClearAlertsToBottom();
            setTimeout(() => {
              this.totalCount = response.totalCount;
              this.paginator.pageIndex = this.currentPage;
              this.paginator.length = response.totalCount;
            });
          }
        },
        (err) => {
          this.loading = false;
          this.alertList = [];
          this.dataSource = new MatTableDataSource<AlertList>(this.alertList);
        }
      );
  }

  //Create Model for search
  createModel(this: any) {
    this.pageNumber = this.pageNumber;
    this.pageSize = this.pageSize;
    let obj = {
      field: this.sortColumn ? this.sortColumn : '',
      dir: this.sortDirection ? this.sortDirection : '',
    };
    this.searchString = this.searchString ? this.searchString : '';
    this.model.push(obj);
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
    });
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
    this.sortColumn =
      typeof this.sort.active !== 'undefined' ? this.sort.active : '';
    this.GetAlertDetailsWithFilters();
  }

  clearSearch() {
    this.pageNumber = 1;
    this.seachByStatus = '';
    this.searchString = '';
    this.GetAlertDetailsWithFilters();
  }

  refresh() {
    this.pageNumber = this.pageNumber;
    this.seachByStatus = '';
    this.searchString = '';
    this.GetAlertDetailsWithFilters();
    // this.checkSnoozedAlerts();
  }

  snoozeBy(snoozeTime: any, snoozeByTime: any) {
    this.service
      .getSnoozedAlerts(snoozeTime.Id, snoozeByTime)
      .subscribe((data: any) => {
        console.log('snooze by response', data);
        this.GetAlertDetailsWithFilters();
      });
  }

  closeSnoozeDialog(snoozeDialog: any) {
    snoozeDialog.close.emit();
  }

  moveClearAlertsToBottom() {
    let clearedList: AlertList[];
    clearedList = this.alertList.filter(
      (alert) => alert.AlertLevel === 'Cleared'
    );
    this.alertList = this.alertList.filter(
      (alert) => alert.AlertLevel !== 'Cleared'
    );
    clearedList.forEach((item) => {
      this.alertList.push(item);
    });
    this.dataSource = new MatTableDataSource<AlertList>(this.alertList);
  }

  clearAlerts(alert: any, comment: string) {
    this.loading = true;
    this.service.clearAlerts(alert.Id, comment).subscribe((data: any) => {
      this.clearAlertsComments = '';
      if (data.success == true) {
        this.GetAlertDetailsWithFilters();
        this.loading = false;
      }
    });
  }

  closeClearAlertDialog(alertDialog: any) {
    alertDialog.close.emit();
  }

  // UI functionality

  getLegendCount() {
    let high = this.alertList.filter((alert) => alert.AlertLevel == 'High');
    this.highCount = high.length;

    let med = this.alertList.filter((alert) => alert.AlertLevel == 'Medium');
    this.medCount = med.length;

    let low = this.alertList.filter((alert) => alert.AlertLevel == 'Low');
    this.lowCount = low.length;

    let clear = this.alertList.filter((alert) => alert.AlertLevel == 'Cleared');
    this.clearCount = clear.length;
  }

  legendFilter(priority: any) {
    let priorityList: AlertList[];
    switch (priority) {
      case 'High':
        priorityList = this.alertList.filter(
          (alert) => alert.AlertLevel === 'High'
        );
        this.dataSource = new MatTableDataSource<AlertList>(priorityList);
        break;
      case 'Medium':
        priorityList = this.alertList.filter(
          (alert) => alert.AlertLevel === 'Medium'
        );
        this.dataSource = new MatTableDataSource<AlertList>(priorityList);
        break;
      case 'Low':
        priorityList = this.alertList.filter(
          (alert) => alert.AlertLevel === 'Low'
        );
        this.dataSource = new MatTableDataSource<AlertList>(priorityList);
        break;
      case 'Cleared':
        priorityList = this.alertList.filter(
          (alert) => alert.AlertLevel === 'Cleared'
        );
        this.dataSource = new MatTableDataSource<AlertList>(priorityList);
        break;
    }
  }

  resetDateFilters() {
    // this.dataSource.filter = '';
    this.pageNumber = this.pageNumber;
    this.seachByStatus = '';
    this.searchString = '';
    let todaysDate = new Date();
    this.selectedRangeValue = new DateRange<Date>(todaysDate, null);
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }

  setDateSelected(option: any) {
    this.resetDateFilters();
    switch (option) {
      case DateRanges.DAY:
        let today = new Date().toISOString();
        let d = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(d.getDate() + 1);
        let tomorrowStr = tomorrow.toISOString();
        this.GetAlertListWithDateFilters(
          today.substring(0, 10),
          tomorrowStr.substring(0, 10)
        );
        break;

      case DateRanges.WEEK:
        let curr = new Date(); // get current date
        let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        let last = first + 6; // last day is the first day + 6
        let firstday = new Date(curr.setDate(first)).toISOString();
        let lastday = new Date(curr.setDate(last)).toISOString();
        this.GetAlertListWithDateFilters(
          firstday.substring(0, 10),
          lastday.substring(0, 10)
        );
        break;

      case DateRanges.MONTH:
        let date = new Date();
        let firstDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          1
        ).toISOString();
        let lastDay = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).toISOString();
        this.GetAlertListWithDateFilters(
          firstDay.substring(0, 10),
          lastDay.substring(0, 10)
        );
    }
  }

  resetDateRangeFilters() {
    // this.dataSource.filter = '';
    this.refresh();
    let todaysDate = new Date();
    this.selectedRangeValue = new DateRange<Date>(todaysDate, null);
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }

  getSelectedMonth(month: any) {
    let m = month + 1;
    return m.toString().padStart(2, '0');
  }

  getSelectedDay(day: any) {
    return day.toString().padStart(2, '0');
  }

  applyDateRangeFilter() {
    let fromDate = this.selectedRangeValue.start;
    let toDate = this.selectedRangeValue.end;
    let startDate =
      fromDate?.getFullYear() +
      '-' +
      this.getSelectedMonth(fromDate?.getMonth()) +
      '-' +
      this.getSelectedDay(fromDate?.getDate());
    let endDate =
      toDate?.getFullYear() +
      '-' +
      this.getSelectedMonth(toDate?.getMonth()) +
      '-' +
      this.getSelectedDay(toDate?.getDate());
    this.GetAlertListWithDateFilters(startDate, endDate);
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
