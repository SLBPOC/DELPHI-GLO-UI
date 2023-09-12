import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { WellViewTabsComponent } from './well-list/components/well-view-tabs/well-view-tabs.component';
import { AlertListComponent } from './alerts/components/alert-list/alert-list.component';
const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      { path: '', redirectTo: '/alerts', pathMatch: 'full' },
      {
        path: 'well-list',
        loadChildren: () =>
          import('./well-list/well-list.module').then((m) => m.WellListModule),
      },
      {
        path: 'alerts',
        loadChildren: () =>
          import('./alerts/alerts.module').then((m) => m.AlertsModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
