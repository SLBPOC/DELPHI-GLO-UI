import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MtxTooltipModule } from '@ng-matero/extensions/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ChecklistDatabase } from '../dashboard/components/well-tree-view/well-tree-view.component';
import { TreeViewService } from './services/tree-view.service';
import { AlgorithmsAndMitigationsService } from './services/algorithms-and-mitigations.service';
import { DashboardService } from './services/dashboard.service';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    RouterModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    // DragDropModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatCardModule, 
    MatButtonModule,
    // MtxTooltipModule,
    
    // UI
    MatTabsModule,
    MatGridListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
      ],
  exports: [
    HighchartsChartModule,
    FormsModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    MatTreeModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    // DragDropModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatCardModule, 
    MatButtonModule,
    // MtxTooltipModule,
    
    // UI
    MatTabsModule,
    MatListModule,
    MatGridListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatToolbarModule,
    MatExpansionModule,

  ],
  providers: [BsModalService,
    ChecklistDatabase,
    TreeViewService, BsModalService, AlgorithmsAndMitigationsService, DashboardService],
    // entryComponents: [ModalContentComponent]
})
export class SharedModule {}
