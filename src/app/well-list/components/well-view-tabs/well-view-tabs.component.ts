import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WellsService } from 'src/app/shared/services/wells.service';

@Component({
  selector: 'app-well-view-tabs',
  templateUrl: './well-view-tabs.component.html',
  styleUrls: ['./well-view-tabs.component.scss']
})
export class WellViewTabsComponent {
  wellInfo!: any;
  wellId!:any;
  qo1!:number;
  loader=false;

  @Output('wellDetails') wellDetails: EventEmitter<any> = new EventEmitter<any>();
  constructor(private service: WellsService,private _Activatedroute:ActivatedRoute) {
    this.wellId=this._Activatedroute.snapshot.paramMap.get("id");
    console.log(this.wellId);
  }
  ngOnInit() { 
    this.loader=true;   
    this.getWellGeneralInfo();
  }

  getWellGeneralInfo()
  {
    this.service.getWellInfo(this.wellId).subscribe((resp) => {
      this.wellInfo = resp;  
      this.loader=false;
      let detailedWellInfo = this.wellInfo;
      this.wellDetails.emit(detailedWellInfo);
    });
  }
}
