import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoLineChartComponent } from './algo-line-chart.component';

describe('AlgoLineChartComponent', () => {
  let component: AlgoLineChartComponent;
  let fixture: ComponentFixture<AlgoLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgoLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
