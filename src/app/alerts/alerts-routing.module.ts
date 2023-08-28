import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './alerts.component';
import { AlertListComponent } from './components/alert-list/alert-list.component';

const routes: Routes = [
  {
    path: '', component: AlertsComponent,
    children: [
      { path: '', component: AlertListComponent },

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }
