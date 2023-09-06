import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WellListComponent } from './well-list.component';
import { AlgorithmsAndMitigationComponent } from './components/algorithms-and-mitigation/algorithms-and-mitigation.component';
import { WellInfoComponent } from './components/well-info/well-info.component';
import { WellDetailViewComponent } from './components/well-detail-view/well-detail-view.component';
import { WellViewTabsComponent } from './components/well-view-tabs/well-view-tabs.component';

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
  {
    path: 'well-detail-view',
    component: WellDetailViewComponent,
  },
  {
    path: 'well-view-tabs',
    component: WellViewTabsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WellListRoutingModule {}
