import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsComponent } from './alerts.component';
import { SharedModule } from '../shared/shared.module';
import { AlertListComponent } from './components/alert-list/alert-list.component';


@NgModule({
  declarations: [
    AlertsComponent,
    AlertListComponent
  ],
  imports: [
    CommonModule,
    AlertsRoutingModule,
    SharedModule
  ]
})
export class AlertsModule { }
