import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { WellPerformanceComponent } from './components/well-performance/well-performance.component';
import { YesterdayPercentRunComponent } from './components/yesterday-percent-run/yesterday-percent-run.component';
import { YesterdayCycleCountComponent } from './components/yesterday-cycle-count/yesterday-cycle-count.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { YesterdayCycleBarChartComponent } from './components/yesterday-cycle-count/components/yesterday-cycle-bar-chart/yesterday-cycle-bar-chart.component';
import { ModalContentComponent } from './components/yesterday-cycle-count/components/modal-content/modal-content.component';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { ChecklistDatabase, WellTreeView } from './components/well-tree-view/well-tree-view.component';
import { WellTreeSearchComponent } from './components/well-tree-search/well-tree-search.component';
import { ParameterChartComponent } from './components/parameter-chart/parameter-chart.component';
import { ClassificationSummaryComponent } from './components/classification-summary/classification-summary.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    WellPerformanceComponent,
    YesterdayCycleCountComponent,
    YesterdayPercentRunComponent,
    YesterdayCycleBarChartComponent,
    ModalContentComponent,
    WellTreeSearchComponent,
    ParameterChartComponent,
    ClassificationSummaryComponent,
    WellTreeView
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule

  ],
 
})
export class DashboardModule { }
