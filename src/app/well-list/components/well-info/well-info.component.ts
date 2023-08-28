import { Component } from '@angular/core';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-well-info',
  templateUrl: './well-info.component.html',
  styleUrls: ['./well-info.component.scss']
})
export class WellInfoComponent {

  enabled: Boolean = false

  dynacardSummaryData: {label: string, value: string}[] = [
    {label: 'Current SPM ', value: '5.5 spm'},
    {label: 'Pump Fillage', value: '94.5'},
    {label: 'Well State', value: 'Pumping Normal State'},
    {label: 'Pump Card DiagnisStics ', value: 'Narmal'},
    {label: 'inferred prod', value: '278.0 bbls/day'},

  ]; 
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  createCustomFeed(){
    console.warn("@");
    this.enabled = true
  }
}
