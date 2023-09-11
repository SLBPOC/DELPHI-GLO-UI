import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WellDetailViewService } from '../../../shared/services/well-detail-view.service'
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
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit(){
    this.wellDetailService.getWellCycles().subscribe((resp) => {
      this.wellCycles = resp;
      debugger
    })
  }

}
