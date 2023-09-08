import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-well-view-tabs',
  templateUrl: './well-view-tabs.component.html',
  styleUrls: ['./well-view-tabs.component.scss']
})
export class WellViewTabsComponent {
 constructor(private activatedRoute :ActivatedRoute )
{}
  ngOnInit() 
  {
    this.activatedRoute.params.subscribe(params => {
      let id = params['Id'];
      console.log(`${id}`);
      });
  }
}
