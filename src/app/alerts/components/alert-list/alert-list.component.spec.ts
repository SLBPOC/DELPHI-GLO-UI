import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AlertListService } from '../../../shared/services/alert-list.service';
import { AlertList } from '../../../shared/models/alert-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertListComponent } from './alert-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';

fdescribe('AlertListComponent', () => {
  let component: AlertListComponent;
  let fixture: ComponentFixture<AlertListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        AlertListComponent,
        CustomAlertComponent
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatTableModule
      ],
      providers: [
        HttpClientModule,
        { provide: MatDialog, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
