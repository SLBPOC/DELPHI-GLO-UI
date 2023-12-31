import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventsListComponent } from './components/events-list/events-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [{ path: '', component: EventsListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
