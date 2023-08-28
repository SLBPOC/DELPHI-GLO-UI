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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
import{SLBSearchParams, SortOptions } from 'src/app/model/slb-params';

import { EventListService } from 'src/app/shared/services/event-list.service';
import { EventList } from 'src/app/shared/models/event-list';

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
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements AfterViewInit {
  wellList!: EventList[];
  // date = new Date();
  daysSelected: any[] = [];
  event: any;
  todayDate: Date = new Date();
  eventFormModel: EventFormModel = new EventFormModel();
  slbSearchParams: SLBSearchParams = new SLBSearchParams();
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'stat',
    'wellName',
    'eventLevel',
    'date',
    'desc',
  ];
  eventTypes = ['High', 'Medium', 'Low'];
  statuses = ['Completed', 'In Progress'];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  pipe!: DatePipe;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private service: EventListService) {
    this.dataSource = new MatTableDataSource<any>([]);
  }
  ngOnInit() {
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    console.log(dte.toString());
    this.service.getWellEvents(this.slbSearchParams).subscribe((resp) => {
      this.bindGridData(resp);
      //this.dataSource.sort = this.sort;
    });
    this.callApi();
  }
  test() {
    let aDate = new Date();
    console.log(aDate.getDate() - 1);
  }
  bindGridData(res: EventList[]) {
    this.wellList = res;
    this.dataSource = new MatTableDataSource<EventList>(this.wellList);
    //this.dataSource.paginator = this.paginator;
  }
  search(data: Event) {
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val;
  }

  eventtChange(event: any) {
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

  selectDate(date: any) {
    console.log('Selelcted date range --> ' + date.value);
    let fromDate = date.value.start.toISOString();
    let startDate = this.range.get('start')?.value;
    let endDate = this.range.get('end')?.value;
    let toDate = date.value.end.toISOString();
    this.dataSource.filterPredicate = (data: any, filter: any) => {
      if (fromDate && toDate) {
        return data.date >= fromDate && data.date <= toDate;
      }
      return true;
    };
    this.dataSource.filter = '' + Math.random();
  }

  @Input() selectedRangeValue: DateRange<Date> | undefined;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  // @ViewChild(MatSort) sort: MatSort;

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
  onKeydownEventSearch(event: any) {
    if (event?.key === 'Enter') {
      this.callApi();
    }
  }
  applyFilterSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter() {
    this.callApi();
  }
  callApi(sort: SortOptions = new SortOptions()) {
    //prepare input request
    this.slbSearchParams.pageNumber = 1;
    this.slbSearchParams.pageSize = 10;
    this.slbSearchParams.sort = sort;
    // this.slbSearchParams.searchTerm = this.eventFormModel.searchQueryInput;
    if (!this.slbSearchParams.params)
      this.slbSearchParams.params = new Map<string, string>();
    if (this.eventFormModel.eventType) {
      let eventTypeObj = this.EventType.find(
        (x) => x.value == this.eventFormModel.eventType.toString()
      );
      this.slbSearchParams.params.set(
        'eventType',
        eventTypeObj?.viewValue ?? ''
      );
    }
    // if (this.eventFormModel.status) {
    //   let alertstatusObj = this.EventStatus.find(
    //     (x) => x.value == this.eventFormModel.status.toString()
    //   );
    //   this.slbSearchParams.params.set(
    //     'status',
    //     alertstatusObj?.viewValue || ''
    //   );
    // }
    if (
      this.eventFormModel.dateRange?.start &&
      this.eventFormModel.dateRange?.end
    ) {
      this.slbSearchParams.params.set(
        'dateRange',
        this.eventFormModel.dateRange.start.toString() +
          '$' +
          this.eventFormModel.dateRange.end.toString()
      );
    }
    this.service.getWellEvents(this.slbSearchParams).subscribe((resp) => {
      this.bindGridData(resp);
    });
  }
  applyFilterTest(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe((x: SortOptions) => {
      this.callApi(x);
    });
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clearAll() {
    this.slbSearchParams.searchTerm = null!;
    this.slbSearchParams.params = new Map<string, string>();
    this.service.getWellEvents(this.slbSearchParams).subscribe((resp) => {
      this.bindGridData(resp);
    });
  }
  EventType: Food[] = [
    { value: '1', viewValue: 'High' },
    { value: '2', viewValue: 'Medium' },
    { value: '3', viewValue: 'Low' },
  ];
  EventStatus: Food[] = [
    { value: '1', viewValue: 'Completed' },
    { value: '2', viewValue: 'In Progress' },
  ];
  setSelectedDateRange(range: DateRanges) {
    this.resetCalender(false);

    switch (range) {
      case DateRanges.DAY:
        let today = new Date();
        let previous = new Date();
        previous.setDate(previous.getDate() - 1);
        this.eventFormModel.dateRange.start = previous;
        this.eventFormModel.dateRange.end = today;
        let dates = this.getDates(previous, today);
        dates.forEach((element) => {
          this.select(element, this.calendarChild);
        });

        break;
      case DateRanges.WEEK:
        var curr = new Date(); // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));
        this.eventFormModel.dateRange.start = firstday;
        this.eventFormModel.dateRange.end = lastday;
        let datesWeek = this.getDates(firstday, lastday);
        datesWeek.forEach((element) => {
          this.select(element, this.calendarChild);
        });
        break;
      case DateRanges.MONTH:
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.eventFormModel.dateRange.start = firstDay;
        this.eventFormModel.dateRange.end = lastDay;
        let datesM = this.getDates(firstDay, lastDay);
        datesM.forEach((element) => {
          this.select(element, this.calendarChild);
        });
        break;
    }
  }
  @ViewChild('picker') datePicker!: MatDatepicker<Date>;
  openCalender() {
    this.datePicker.open();
  }

  getPreviousDay(dateRange: DateRanges): Date {
    let previous = new Date();
    switch (dateRange) {
      case DateRanges.DAY:
        break;
      case DateRanges.WEEK:
        break;
      case DateRanges.MONTH:
        break;
    }
    return previous;
  }
  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    return this.daysSelected.find((x) => x == date) ? ['selected'] : '';
  };

  @ViewChild('calendar') calendarChild!: MatCalendar<any>;
  resetCalender(initApiCall: boolean = true) {
    this.daysSelected = [];
    this.calendarChild.updateTodaysDate();
    this.eventFormModel.dateRange = new DateRangeProps();
    this.clearParams(['dateRange']);
    if (initApiCall) this.callApi();
  }
  clearFilter() {
    this.eventFormModel.eventType = 0;
    this.eventFormModel.status = 0;
    this.clearParams(['eventType', 'status']);
    this.callApi();
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
  getDates(startDate: Date, stopDate: Date) {
    var dateArray = new Array();
    var currentDate = new Date(startDate);
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }
  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex((x) => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);

    calendar.updateTodaysDate();
  }
}
