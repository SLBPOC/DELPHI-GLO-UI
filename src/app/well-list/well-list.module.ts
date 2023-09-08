import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellListRoutingModule } from './well-list-routing.module';
import { WellListComponent } from './well-list.component';
import { SharedModule } from '../shared/shared.module';
import { AlgorithmsAndMitigationComponent } from './components/algorithms-and-mitigation/algorithms-and-mitigation.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AlgoFilterComponent } from './components/algorithms-and-mitigation/components/algo-filter/algo-filter.component';
import { AlgoLineChartComponent } from './components/algorithms-and-mitigation/components/algo-line-chart/algo-line-chart.component';
import { WellInfoComponent } from './components/well-info/well-info.component';
import { WellDetailViewComponent } from './components/well-detail-view/well-detail-view.component';
import { WellViewTabsComponent } from './components/well-view-tabs/well-view-tabs.component';
import { WellviewAlertComponent } from './components/wellview-alert/wellview-alert.component';
import { WellviewEventlogComponent } from './components/wellview-eventlog/wellview-eventlog.component';

@NgModule({
  declarations: [
    WellListComponent,
    AlgorithmsAndMitigationComponent,
    WellInfoComponent,
    NavigationComponent,
    AlgoFilterComponent,
    AlgoLineChartComponent,
    WellDetailViewComponent,
    WellViewTabsComponent,
    WellviewAlertComponent,
    WellviewEventlogComponent,
  ],
  imports: [CommonModule, WellListRoutingModule, SharedModule],
})
export class WellListModule {}
