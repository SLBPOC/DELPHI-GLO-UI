import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WellDetailViewService } from '../../../shared/services/well-detail-view.service';
import { DateRange } from '@angular/material/datepicker';
import { ThemePalette } from '@angular/material/core';
interface Food {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  gl_setpoint: number;
  qi_units: number;
  qw_units: number;
  wc_units: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { gl_setpoint: 900, qi_units: 50.1, qw_units: 74.26, wc_units: 44.88 },
  { gl_setpoint: 900, qi_units: 50.1, qw_units: 74.26, wc_units: 44.88 },
  { gl_setpoint: 900, qi_units: 50.1, qw_units: 74.26, wc_units: 44.88 },
  { gl_setpoint: 900, qi_units: 50.1, qw_units: 74.26, wc_units: 44.88 },
  { gl_setpoint: 900, qi_units: 50.1, qw_units: 74.26, wc_units: 44.88 },
  { gl_setpoint: 900, qi_units: 50.1, qw_units: 74.26, wc_units: 44.88 },
  { gl_setpoint: 900, qi_units: 50.1, qw_units: 74.26, wc_units: 44.88 },
  { gl_setpoint: 900, qi_units: 50.1, qw_units: 74.26, wc_units: 44.88 },
  { gl_setpoint: 900, qi_units: 50.1, qw_units: 74.26, wc_units: 44.88 },
  { gl_setpoint: 900, qi_units: 50.1, qw_units: 74.26, wc_units: 44.88 },
];

@Component({
  selector: 'app-well-detail-view',
  templateUrl: './well-detail-view.component.html',
  styleUrls: ['./well-detail-view.component.scss']
})
export class WellDetailViewComponent {

  wellCycles!: any;
  
  @Input() detailWellInfo: any;
  @Input() selectedRangeValue!: DateRange<Date>;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

  constructor(private wellDetailService: WellDetailViewService) {}

  displayedColumns: string[] = ['gl_setpoint', 'qi_units', 'qw_units', 'wc_units'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  // wellCycleStatus = [
  //   { c1: 'steak-0', viewValue: 'Steak' },
  //   { value: 'pizza-1', viewValue: 'Pizza' },
  //   { value: 'tacos-2', viewValue: 'Tacos' },
  // ]
  date = new Date();
  startDate:any;
  endDate:any;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = true;
  public enableMeridian = true; 
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit(){
    this.wellDetailService.getWellCycles().subscribe((resp) => {
      this.wellCycles = resp;
      this.detailWellInfo
    })
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
    // this.flag = false;
  }

  getSelectedMonth(month: any){
    let m = month + 1;
    return m.toString().padStart(2,'0');
  }

  getSelectedDay(day: any){
    return day.toString().padStart(2,'0');
  }

  getDateRange() {
    let fromDate = this.selectedRangeValue.start;
    let toDate = this.selectedRangeValue.end;
    this.startDate = fromDate?.getFullYear() + '-' + this.getSelectedMonth(fromDate?.getMonth()) + '-' + this.getSelectedDay(fromDate?.getDate());
    this.endDate = toDate?.getFullYear() + '-' + this.getSelectedMonth(toDate?.getMonth()) + '-' + this.getSelectedDay(toDate?.getDate());
    let timeZone = this.date.toISOString().slice(-4);
    let time = this.date.toTimeString().slice(0, 8);
    let customTime = "T" + time + "." + timeZone;
    this.startDate = this.startDate + customTime;
    this.endDate = this.endDate + customTime;
  }



}
