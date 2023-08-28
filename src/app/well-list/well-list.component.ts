import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateRange } from '@angular/material/datepicker';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { WellListModel } from '../../app/shared/models/well-list';
import { WellListService } from '../../app/shared/services/well-list.service';
import { Router } from '@angular/router';

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
  displayedColumns: string[] = ['status', 'well_name', 'time_stamp', 'GLI_SetPoint', 'Oliq', 'QOil', 'WC', 'Compressor_Uptime', 'Production_Uptime', 'Current_GLI_Setpoint', 'Cycle_Status', 'Auto_Manual', 'well_status'];
  wellList! : WellListModel[];
  dataSource = new MatTableDataSource<WellListModel>(this.wellList);
  highCount = 0;
  medCount = 0;
  lowCount = 0;
  searchQueryInput: any;
  approvalMode: Option[] = [
    { id: '0', value: 'Manual' },
    { id: '1', value: 'Auto' }
  ]
  prodUptime: Option[] = [
    { id: '0', value: 'No' },
    { id: '1', value: 'Yes' }
  ]

  @Input() selectedRangeValue!: DateRange<Date>;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  wellListId!:number;
  constructor(private _formBuilder: FormBuilder, private service: WellListService, private router: Router) { }
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

  getData(id : any){
    this.router.navigate(['/glo/feature/wellInfo',id]);
//console.log(id);
  }

  setGridData(){
    this.service.getWellDetails().subscribe((resp) => {
      this.wellList = resp;
      this.dataSource = new MatTableDataSource<WellListModel>(this.wellList);
      this.getLegendCount();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getLegendCount(){
    let high = this.wellList.filter(alert => alert.status == "high");
    this.highCount = high.length;

    let med = this.wellList.filter(alert => alert.status == "med");
    this.medCount = med.length;

    let low = this.wellList.filter(alert => alert.status == "low");
    this.lowCount = low.length;
  }

  search(data: Event) {
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val;
  }

  refresh() {
    this.dataSource = new MatTableDataSource<WellListModel>(this.wellList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.searchQueryInput = null;
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
            return data.time_stamp >= firstday && data.time_stamp <= lastday;
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
            return data.time_stamp >= firstDay && data.time_stamp <= lastDay;
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
        return data.time_stamp >= fromDate && data.time_stamp <= toDate;
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
