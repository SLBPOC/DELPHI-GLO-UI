import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertList } from 'src/app/shared/models/alert-list';
import { AlertListService } from 'src/app/shared/services/alert-list.service';

@Component({
  selector: 'app-well-view-tabs',
  templateUrl: './well-view-tabs.component.html',
  styleUrls: ['./well-view-tabs.component.scss'],
})
export class WellViewTabsComponent {}
