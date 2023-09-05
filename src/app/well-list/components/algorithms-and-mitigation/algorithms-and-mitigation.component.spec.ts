import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmsAndMitigationComponent } from './algorithms-and-mitigation.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { AlgoLineChartComponent } from './components/algo-line-chart/algo-line-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
 // Commented for Testing
// import { AlgorithmsAndMitigationsService } from '../../../../services/algorithms-and-mitigations.service';
import { Observable, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

export class AlgorithmsAndMitigationsServiceStub {

  saveTags(): Observable<any> {
    return of(
      [{
        id: 1,
        tag: 'Dynacard class'
      }]
    )
  }

  getControllerSelectOptionsData(): Observable<any>{
    return of(
      [{
        id: 1,
        tag: 'Dynacard class'
      }]
    )
  }

  getTagSelectOptions(): Observable<any>{
    return of(
      [{
        id: 1,
        tag: 'Dynacard class'
      }]
    )
  }

  getTagsData(): Observable<any>{
    return of(
      [{
        id: 1,
        tag: 'Dynacard class'
      }]
    )
  }

  applyTags(payload: any): Observable<any> {
    return of(
      [{
        id: 1,
        tag: 'Dynacard class'
      }]
    )
  }


  refreshTags(payload: any): Observable<any> {
    return of(
      [{
        id: 1,
        tag: 'Dynacard class'
      }]
    )
  }
  networkTags(payload: any): Observable<any> {
    return of(
      [{
        id: 1,
        tag: 'Dynacard class'
      }]
    )
  }

  syncTags(payload: any): Observable<any> {
    return of(
      [{
        id: 1,
        tag: 'Dynacard class'
      }]
    )
  }
  getAlgorithmsAndMitigationsChartData(): Observable<any> {
    return of(
      [{
        id: 1,
        tag: 'Dynacard class'
      }]
    )
  }


}

describe('AlgorithmsAndMitigationComponent', () => {
  let component: AlgorithmsAndMitigationComponent;
  let fixture: ComponentFixture<AlgorithmsAndMitigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        AlgorithmsAndMitigationComponent,
        AlgoLineChartComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        HighchartsChartModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatSelectModule,
        MatExpansionModule,
        MatTabsModule,
        MatCardModule

      ],
      providers: [
        HttpClientModule, 
         // Commented for Testing
        // AlgorithmsAndMitigationsService,
        // { provide: AlgorithmsAndMitigationsService, useClass: AlgorithmsAndMitigationsServiceStub }
      ]
    })
    .compileComponents();
     // Commented for Testing
    // fixture = TestBed.createComponent(AlgorithmsAndMitigationComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmsAndMitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('function: onTagSelectionChanged', () => {
    spyOn(component, 'onTagSelectionChanged').and.callThrough();
    component.tagsSelected = 1;
    component.tagControl.setValue(Array.of('Dynacard class', 'Flatlining'));
    const event = {}
    component.onTagSelectionChanged(event);
    expect(component.tagsSelected).toEqual(2);
    expect(component.onTagSelectionChanged).toHaveBeenCalled();
  });

  it('function: applyTags', () => {
    spyOn(component, 'applyTags').and.callThrough();
    component.applyTags();
    expect(component.applyTags).toHaveBeenCalled();
  });


  it('function: saveTags', () => {
    spyOn(component, 'saveTags').and.callThrough();
    component.saveTags();
    expect(component.saveTags).toHaveBeenCalled();
  });

  it('function: refreshTags', () => {
    spyOn(component, 'refreshTags').and.callThrough();
    component.refreshTags();
    expect(component.refreshTags).toHaveBeenCalled();
  });

  it('function: networkTags', () => {
    spyOn(component, 'networkTags').and.callThrough();
    component.networkTags();
    expect(component.networkTags).toHaveBeenCalled();
  });

  it('function: syncTags', () => {
    spyOn(component, 'syncTags').and.callThrough();
    component.syncTags();
    expect(component.syncTags).toHaveBeenCalled();
  });

});