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
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { WellListModel } from '../../app/shared/models/well-list';
import { WellListService } from '../../app/shared/services/well-list.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, map, tap } from 'rxjs';

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
  selector: 'app-well-list',
  templateUrl: './well-list.component.html',
  styleUrls: ['./well-list.component.scss'],
})
export class WellListComponent {
  displayedColumns: string[] = [
    'WellPriority',
    'wellName',
    'TimeStamp',
    'GLISetPoint',
    'CompressorUpTime',
    'ProductionUpTime',
    'DeviceUpTime',
    'LastCycleStatus',
    'CurrentGLISetpoint',
    'CurrentCycleStatus',
    // 'PreprocessorState',
    'ApprovalMode',
    'ApprovalStatus',
    'NoOfAlerts',
  ];
  hidddenColumns: string[] = ['QLiq', 'QOil', 'Qg', 'Qw', 'Wc'];

  approvalModeList: Option[] = [
    { id: '0', value: 'Manual' },
    { id: '1', value: 'Auto' },
  ];
  prodUptime: Option[] = [
    { id: '0', value: 'Approve' },
    { id: '1', value: 'Discard' },
    { id: '2', value: 'Override' },
  ];
  wellList!: WellListModel[];
  extraColumnsCtrl: any = new FormControl('');
  extraColumnsList: { label: string; accessor: string; header: string }[] = [
    {
      label: 'QOil',
      accessor: 'QOil',
      header: 'QOil',
    },
    {
      label: 'QLiq',
      accessor: 'QLiq',
      header: 'QLiq',
    },
    {
      label: 'Qw',
      accessor: 'Qw',
      header: 'Qw',
    },
    {
      label: 'Qg',
      accessor: 'Qg',
      header: 'Qg',
    },
    { label: 'Wc', accessor: 'Wc', header: 'Wc' },

    // { label: 'ApprovalMode', accessor: 'ApprovalMode', header: 'ApprovalMode' },
  ];

  @ViewChild('searchQueryInput')
  searchInput!: ElementRef<HTMLInputElement>;

  dataSource = new MatTableDataSource<WellListModel>(this.wellList);
  highCount = 0;
  medCount = 0;
  lowCount = 0;
  searchQueryInput: any;
  selectedColumn: string[] = [];

  @Input() selectedRangeValue!: DateRange<Date>;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  wellListId!: number;
  searchString: string = '';
  sortDirection: string = '';
  sortColumn: string = '';
  cycleStatus: string = '';
  pageIndex: number = 1;
  pageSize: number = 5;
  pageNumber: number = 1;
  currentPage = 0;
  totalCount = 0;
  TotalCount: number = 0;
  High: number = 0;
  Medium: number = 0;
  Low: number = 0;
  loading = true;
  model: any = {};
  displayableExtraColumns: {
    label: string;
    accessor: string;
    header: string;
  }[] = [];
  searchsortExpression: any;
  sortExpression: any = [
    {
      dir: this.sortDirection !== 'undefined' ? this.sortDirection : '',
      field: this.sortColumn !== 'undefined' ? this.sortColumn : '',
    },
  ];
  // sortExpression: any = [];

  // searchInput: any;
  searchText: any;
  seachByStatus!: string;
  status = this.seachByStatus;
  CycleStatus: string = '';
  ApprovalMode: string = '';
  ApprovalStatus: string = '';
  wellPriority: string = '';
  constructor(
    private _formBuilder: FormBuilder,
    private service: WellListService,
    public router: Router
  ) {}
  toppings = this._formBuilder.group({
    EffectiveRunTime: false,
    CyclesToday: false,
    StructuralLoad: false,
    MinMaxLoad: false,
    GearboxLoad: false,
    RodStress: false,
  });

  ngOnInit() {
    this.setGridData();
  }

  getData(id: any) {
    this.router.navigate(['/well-view-tabs', id]);
    //console.log(id);
  }

  setGridData() {
    this.loading = true;

    let sortExpression = this.createModel();
    // this.createModel();
    console.log(this.ApprovalStatus);
    console.log(this.ApprovalMode);
    this.service
      .getWellDetailsWithFilters(
        this.pageIndex,
        this.pageSize,
        this.searchString,
        this.ApprovalStatus,
        this.ApprovalMode,
        sortExpression
      )
      .subscribe((response) => {
        if (response.hasOwnProperty('data')) {
          this.loading = false;
          this.wellList = response.data;
          // this.wellList.forEach(x => this.prepareChart(x));
          this.dataSource = new MatTableDataSource<WellListModel>(
            this.wellList
          );
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = response.totalCount;
          });

          this.TotalCount = response.totalCount;
          this.High = response.totalWellPriorityHigh;
          this.Medium = response.totalWellPriorityMedium;
          this.Low = response.totalWellPriorityLow;
          // this.ApprovalStatus = response.ApprovalStatus;
          // this.ApprovalMode = response.ApprovalMode;
        }
      });
  }

  //Create Model for search

  createModel(this: any) {
    console.log(this.pageSize + this.model);
    // this.model.pageSize = this.pageSize;
    // this.model.pageNumber = this.pageNumber;
    // this.model.status = this.status ? this.status : '';
    this.searchString = this.searchString ? this.searchString : '';
    // this.model.skip = this.skip ? this.skip : 0;
    let obj = {
      dir: this.sortDirection ? this.sortDirection : '',
      field: this.sortColumn ? this.sortColumn : '',
    };
    this.model.dir = this.sortDirection ? this.sortDirection : '';
    this.model.field = this.sortColumn;
    // this.model.sortColumn = this.sortColumn ? this.sortColumn : '';
    // this.model.cycleStatus = this.cycleStatus ? this.cycleStatus : '';
    // this.model.ApprovalMode = this.ApprovalMode ? this.ApprovalMode : '';
    this.model = [];
    this.model.push(obj);
    return this.model;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    fromEvent<any>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event) => event.target.value),
        debounceTime(500),
        distinctUntilChanged(),
        tap((x) => (this.searchText = x))
      )
      .subscribe((x) => {
        if (x != undefined && x.trim() != '') {
          this.setGridData();
        }
      });
  }
  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.pageIndex = event.pageIndex + 1;
    this.setGridData();
  }
  SeachByStatus(status: string) {
    this.searchString = status;
    console.log('SeachByStatus');
    console.log(this.searchString);
    this.pageNumber = 1;
    this.setGridData();
  }
  ApplyByFilter(value: string) {
    this.ApprovalMode = value;
    this.setGridData();
  }
  ApplyProductionFilter(value: string) {
    this.ApprovalStatus = value;
    this.setGridData();
  }
  getLegendCount() {
    this.service.getWellDetails().subscribe((resp) => {
      this.wellList = resp;
      let high = this.wellList.filter((alert) => alert.wellPriority == 'High');
      this.highCount = high.length;

      let med = this.wellList.filter((alert) => alert.wellPriority == 'Medium');
      this.medCount = med.length;

      let low = this.wellList.filter((alert) => alert.wellPriority == 'Low');
      this.lowCount = low.length;
    });
  }

  search(data: Event) {
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val;
  }
  clearSearch() {
    this.searchString = '';
    this.pageIndex;
    this.pageSize;
    this.ApprovalMode = '';
    this.ApprovalStatus = '';
    this.sortExpression;
    this.setGridData();
  }

  RefreshGrid() {
    this.searchString = '';
    this.pageIndex;
    this.pageSize;
    this.ApprovalMode = '';
    this.ApprovalStatus = '';
    this.sortExpression;
    this.setGridData();
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
            return data.time_stamp >= firstday && data.time_stamp <= lastday;
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
            return data.time_stamp >= firstDay && data.time_stamp <= lastDay;
          }
          return true;
        };
        this.dataSource.filter = '' + Math.random();
        break;
    }
  }

  onChangeDemo(event: any) {
    if (event.checked) {
      if (this.hidddenColumns.filter((resp) => event.source.value === resp)) {
        // this.displayedColumns.push(event.source.value);
        this.displayedColumns.splice(5, 0, event.source.value);
      }
    } else {
      this.displayedColumns = this.displayedColumns.filter(function (e) {
        return e !== event.source.value;
      });
    }
  }
  public handlePage(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.sortDirection = this.sort.direction;
    this.sortColumn =
      typeof this.sort.active !== 'undefined' ? this.sort.active : '';
    this.setGridData();
  }

  public onSortChanged(e: any) {
    this.pageNumber = this.pageNumber;
    this.pageSize = this.pageSize;
    this.searchString = this.searchString;
    this.sortExpression = this.sortExpression;
    this.sortDirection = this.sort.direction;
    this.sortColumn =
      typeof this.sort.active !== 'undefined' ? this.sort.active : '';
    this.setGridData();
  }

  resetDateRangeFilters() {
    // this.dataSource.filter = '';
    // this.refresh();
    let todaysDate = new Date();
    this.selectedRangeValue = new DateRange<Date>(todaysDate, null);
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }

  applyDateRangeFilter() {
    let fromDate = this.selectedRangeValue.start?.toISOString();
    let toDate = this.selectedRangeValue.end?.toISOString();
    this.dataSource.filterPredicate = (data: any) => {
      if (fromDate && toDate) {
        return data.time_stamp >= fromDate && data.time_stamp <= toDate;
      }
      return true;
    };
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
  navigateToWellInfo(wellId: string) {
    this.router.navigateByUrl(`/well-info`);
  }
}
