import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WellListComponent } from './well-list.component';
import { AlgorithmsAndMitigationComponent } from './components/algorithms-and-mitigation/algorithms-and-mitigation.component';
import { WellInfoComponent } from './components/well-info/well-info.component';

const routes: Routes = [
  {
    path: '',
    component: WellListComponent,
    // children: [
    //   { path: 'algorithms-and-mitigations', component: AlgorithmsAndMitigationComponent },

    // ]
  },
  {
    path: 'well-info',
    component: WellInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WellListRoutingModule {}
