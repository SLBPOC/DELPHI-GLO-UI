import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { AlertListComponent } from './alerts/components/alert-list/alert-list.component';
const routes: Routes = [
  // { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: 'well-list', loadChildren: () => import('./well-list/well-list.module').then(m => m.WellListModule) },
  // { path: 'alerts', loadChildren: () => import('./alerts/alerts.module').then(m => m.AlertsModule) },
  // { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
  // { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
  // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  // { path: '', component: AppComponent },

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
      { path: 'alerts/:WellName', component: AlertListComponent },
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

// const routes: Routes = [
//   // {
//   //   path: '',
//   //   component: FeatureComponent,
//   //   children: [
//       {
//         path: '',
//         component: SidenavComponent,
//         children: [
//           { path:'',redirectTo:'/dashboard',pathMatch:'full'},
//           { path: 'dashboard', component: DashboardComponent },
//           { path: 'alert-list', component: AlertListComponent },
//           { path: 'event-list', component: EventListComponent },
//           { path: 'wells', component: WellsComponent },
//           { path: 'Parameter', component: ParChartComponent },
//           {path:'well-details-dynacard',component:WellDetailsDynacardComponent},
//           {
//             path: 'algorithms-and-mitigations',
//             component: AlgorithmsAndMitigationComponent,
//           },
//           {
//             path: 'well-info',
//             component: WellInfoComponent,
//           }
//         ],
//       },
//       { path: 'well-performance', component: WellPerformanceComponent },

//       {
//         path: 'scatter-chart',
//         component: ScatterChartComponent,
//       },
//       {
//         path: 'bubble-chart',
//         component: BubbleChartComponent,
//       }

//   //   ],
//   // },

// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
