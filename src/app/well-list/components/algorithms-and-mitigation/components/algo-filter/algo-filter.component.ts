import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlgorithmsAndMitigationsService } from 'src/app/shared/services/algorithms-and-mitigations.service';

@Component({
  selector: 'app-algo-filter',
  templateUrl: './algo-filter.component.html',
  styleUrls: ['./algo-filter.component.scss']
})
export class AlgoFilterComponent implements OnInit{

  filterGroup!: FormGroup<any>;

  constructor(private fb: FormBuilder, private service: AlgorithmsAndMitigationsService) {}


  ngOnInit(): void {
      
    this.createForm();
    this.getAlgoMitFilterData();
  }

  filterControls() {
    return this.filterGroup.controls
  }

  createForm() {
    this.filterGroup = this.fb.group(
      {
        flatlining: new FormControl(false),
        tagging: new FormControl(false),
        fluidPound: new FormControl(false),
        gasInterference: new FormControl(false),
        productionOptimizerPi: new FormControl(false),
        productionOptimizerCi: new FormControl(false),
        primaryFillage: new FormControl(false),
        secondaryPumpFillage: new FormControl(false),
        downTime: new FormControl('')

      }
    )
  }
  getAlgoMitFilterData() {
    this.service.getAlgoMitFilterData().subscribe((data: any) => {
      console.log('getAlgoMitFilterData:- ', data)
      this.filterGroup.setValue(data);
    })
  }
  setAlgoMitFilterData() {
    console.log('setAlgoMitFilterData:- ', this.filterGroup.value)

    const payload = this.filterGroup.value;
    this.service.setAlgoMitFilter(payload).subscribe((data: any) => {
    })
  }

}
