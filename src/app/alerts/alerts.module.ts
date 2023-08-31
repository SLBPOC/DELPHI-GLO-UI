import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsComponent } from './alerts.component';
import { SharedModule } from '../shared/shared.module';
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { CustomAlertComponent } from './components/custom-alert/custom-alert.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AlertsComponent,
    AlertListComponent,
    CustomAlertComponent,
   
  ],
  imports: [
    CommonModule,
    AlertsRoutingModule,
    SharedModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ReactiveFormsModule,
  ]
})
export class AlertsModule { }
