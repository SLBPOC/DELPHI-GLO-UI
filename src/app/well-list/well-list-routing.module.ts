import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WellListComponent } from './well-list.component';
import { AlgorithmsAndMitigationComponent } from './components/algorithms-and-mitigation/algorithms-and-mitigation.component';

const routes: Routes = [
  { 
    path: '', component: WellListComponent,
    // children: [
    //   { path: 'algorithms-and-mitigations', component: AlgorithmsAndMitigationComponent },

    // ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellListRoutingModule { }
