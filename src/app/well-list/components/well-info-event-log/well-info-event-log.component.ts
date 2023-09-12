import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  DateRange,
  MatCalendar,
  MatCalendarCellClassFunction,
  MatDatepicker,
} from '@angular/material/datepicker';
import { FormBuilder } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ViewEncapsulation } from '@angular/compiler';
import { SLBSearchParams, SortOptions } from 'src/app/model/slb-params';

import { EventListService } from 'src/app/shared/services/event-list.service';
import { EventList } from 'src/app/shared/models/event-list';
import { debounceTime, distinctUntilChanged, fromEvent, map, tap } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

interface Food {
  value: string;
  viewValue: string;
}
class EventFormModel {
  searchQueryInput: string;
  dateRange: DateRangeProps;
  eventType: number;
  status: number;
  constructor() {
    this.dateRange = new DateRangeProps();
    this.searchQueryInput = null!;
    this.eventType = null!;
    this.status = null!;
  }
}
class DateRangeProps {
  start!: Date;
  end!: Date;
}
enum DateRanges {
  DAY = 1,
  WEEK = 2,
  MONTH = 3,
}

@Component({
  selector: 'app-well-info-event-log',
  templateUrl: './well-info-event-log.component.html',
  styleUrls: ['./well-info-event-log.component.scss'],
})
export class WellInfoEventLogComponent {
  eventList!: EventList[];
  alertTest: any = [];
  totalCount: number = 0;
  daysSelected: any[] = [];
  event: any;
  searchString: string = '';
  searchStringWellName: string = '';
  eventStatus: string = '';
  eventType: string = '';
  model: any = [];
  seachByStatus: string = '';
  sortDirection: string = '';
  sortColumn: string = '';
  pageSize: number = 10;
  pageNumber: number = 1;
  pageIndex: number = 1;
  skip = 0;
  sortExpression = [{ dir: 'asc', field: 'name' }];
  startDate = new Date();
  endDate = new Date();
  currentPage = 0;
  searchModel1: any[] = [];
  todayDate: Date = new Date();
  eventFormModel: EventFormModel = new EventFormModel();
  slbSearchParams: SLBSearchParams = new SLBSearchParams();
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    // 'Priority',
    'WellName',
    'EventType',
    'EventStatus',
    'EventDescription',
    'CreationDateTime',
  ];

  eventTypes = ['Type1', 'Type2', 'Type3'];
  statuses = ['Completed', 'In Progress'];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  pipe!: DatePipe;
  loading = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchQueryInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('matSelect')
  matSelect!: MatSelect;
  @ViewChild(MatSort)
  sort!: MatSort;
  @Input() selectedRangeValue!: DateRange<Date>;
  constructor(
    private service: EventListService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.searchString = params['id'];
    });
    this.GetEventDetailsWithFilters(null, null, null, null);
  }
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    fromEvent<any>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event) => event.target.value),
        debounceTime(500),
        distinctUntilChanged(),
        tap((x) => (this.searchString = x))
      )
      .subscribe((x) => {
        if (x != undefined && x.trim() != '') {
          this.GetEventDetailsWithFilters(
            null,
            null,
            this.EventType,
            this.eventStatus
          );
        }
      });
  }
  GetEventDetailsWithFilters(
    startDate: any,
    endDate: any,
    eventStatus: any,
    eventType: any
  ) {
    debugger;
    this.eventList = [];
    this.loading = true;
    this.model = [];
    var SearchModel = this.createModel();
    this.service
      .getEventDetailsWithFilters(
        SearchModel,
        this.pageIndex,
        this.pageSize,
        this.searchString,
        startDate,
        endDate,
        eventType,
        eventStatus
      )
      .subscribe((response) => {
        if (response.hasOwnProperty('data')) {
          this.loading = false;
          this.eventList = response.data;
          // this.alertTest = this.eventList.find(
          //   (x) => x. == Number(this.searchString)
          // );
          // this.eventName = this.alertTest.WellName;
          this.dataSource = new MatTableDataSource<EventList>(this.eventList);
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = response.totalCount;
          });

          this.totalCount = response.totalCount;
        }
      });
  }
  GetEventDetailsPage(pageIndex: any, pageSize: any) {
    debugger;
    this.eventList = [];
    this.loading = true;
    this.model = [];
    var SearchModel = this.createModel();
    this.service
      .getEventDetailsWithFilters(SearchModel, pageIndex, pageSize)
      .subscribe((response) => {
        if (response.hasOwnProperty('data')) {
          this.loading = false;
          this.eventList = response.data;
          this.dataSource = new MatTableDataSource<EventList>(this.eventList);
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = response.totalCount;
          });

          this.totalCount = response.totalCount;
        }
      });
  }

  GetEventListWithDateFilters(
    startDate: any,
    endDate: any,
    eventStatus: any,
    eventType: any
  ) {
    debugger;
    this.eventList = [];
    this.loading = true;
    this.model = [];
    var SearchModel = this.createModel();
    this.service
      .getEventDetailsWithFilters(
        SearchModel,
        this.pageIndex,
        this.pageSize,
        this.searchString,
        startDate,
        endDate,
        eventStatus,
        eventType
      )
      .subscribe(
        (response) => {
          //   if (response.hasOwnProperty('data')) {
          //     this.loading = false;
          //     debugger;
          //     this.eventList = response.data;
          //     this.dataSource = new MatTableDataSource<EventList>(this.eventList);
          //     setTimeout(() => {
          //       this.paginator.pageIndex = this.currentPage;
          //       this.paginator.length = response.totalCount;
          //     });
          //   }
          // });
          if (response.status != 404) {
            this.loading = false;

            this.eventList = response.data;

            this.dataSource = new MatTableDataSource<EventList>(this.eventList);

            setTimeout(() => {
              this.totalCount = response.totalCount;

              this.paginator.pageIndex = this.currentPage;

              this.paginator.length = response.totalCount;
            });
          }
        },
        (err) => {
          this.loading = false;

          this.eventList = [];

          this.dataSource = new MatTableDataSource<EventList>(this.eventList);
        }
      );
  }

  searchModel(this: any) {
    // this.model.pageNumber = this.pageNumber;
    // this.model.pageSize = this.pageSize;
    // this.model.skip = this.skip;
    // this.model.searchString = this.searchString ? this.searchString : "";
    let obj = {
      field: this.sortColumn ? this.sortColumn : '',

      dir: this.sortDirection ? this.sortDirection : '',
    };
    this.model.push(obj);
    // this.model.status = this.seachByStatus ? this.seachByStatus : "";
    return this.model;
  }
  createModel(this: any) {
    let obj = {
      field: this.sortColumn ? this.sortColumn : '',

      dir: this.sortDirection ? this.sortDirection : '',
    };
    this.model.push(obj);

    return this.model;
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageNumber = event.pageIndex + 1;
    this.GetEventDetailsPage(this.pageNumber, this.pageSize);
  }

  onSortChanged(e: any) {
    this.pageNumber = this.pageNumber;
    this.pageSize = this.pageSize;
    this.sortDirection = this.sort.direction;
    this.sortColumn =
      typeof this.sort.active !== 'undefined' ? this.sort.active : '';
    this.GetEventDetailsPage(this.pageNumber, this.pageSize);
  }
  clearSearch() {
    this.pageNumber = 1;
    this.seachByStatus = '';
    this.searchString = '';
    this.GetEventDetailsPage(this.pageNumber, this.pageSize);
  }

  refresh() {
    this.pageNumber = 1;
    this.seachByStatus = '';
    this.searchString = '';
    this.GetEventDetailsPage(this.pageNumber, this.pageSize);
  }

  setDateSelected(option: any) {
    this.resetDateRangeFilters();
    switch (option) {
      case DateRanges.DAY:
        let today = new Date().toISOString();
        const filterValue = today.substring(0, 10);
        this.dataSource.filter = filterValue.trim().toLowerCase();
        break;

      case DateRanges.WEEK:
        let curr = new Date(); // get current date
        let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        let last = first + 6; // last day is the first day + 6
        let firstday = new Date(curr.setDate(first)).toISOString();
        let lastday = new Date(curr.setDate(last)).toISOString();
        this.dataSource.filterPredicate = (data: any) => {
          if (firstday && lastday) {
            return data.date >= firstday && data.date <= lastday;
          }
          return true;
        };
        this.dataSource.filter = '' + Math.random();
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
        this.dataSource.filterPredicate = (data: any) => {
          if (firstDay && lastDay) {
            return data.date >= firstDay && data.date <= lastDay;
          }
          return true;
        };
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

  getSelectedMonth(month: any) {
    let m = month + 1;
    return m.toString().padStart(2, '0');
  }

  getSelectedDay(day: any) {
    return day.toString().padStart(2, '0');
  }

  applyDateRangeFilter() {
    debugger;
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
    this.GetEventListWithDateFilters(startDate, endDate, '', '');
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
  status: any;
  getStatus(event: any) {
    this.status = event.value;
  }
  type: any;
  getType(event: any) {
    this.type = event.value;
  }
  applyFilters(event: any) {
    let status = this.status;
    let type = this.type;
    this.GetEventListWithDateFilters('', '', type, status);
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  changeClient(value: any) {
    console.log(value);
  }
  EventType: Food[] = [
    { value: '1', viewValue: 'Type1' },
    { value: '2', viewValue: 'Type2' },
    { value: '3', viewValue: 'Type3' },
  ];
  EventStatus: Food[] = [
    { value: '1', viewValue: 'Completed' },
    { value: '2', viewValue: 'In Progress' },
  ];
  clearFilter() {
    this.eventFormModel.eventType = 0;
    this.eventFormModel.status = 0;
    this.clearParams(['eventType', 'status']);
    this.GetEventDetailsPage(this.pageNumber, this.pageSize);
  }
  clearParams(paramName: string[]) {
    if (
      this.slbSearchParams.params &&
      this.slbSearchParams.params.size > 0 &&
      paramName &&
      paramName.length > 0
    ) {
      paramName.forEach((x) => this.slbSearchParams.params.delete(x));
    }
  }
}
