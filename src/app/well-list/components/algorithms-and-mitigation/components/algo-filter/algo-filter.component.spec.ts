import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoFilterComponent } from './algo-filter.component';

describe('AlgoFilterComponent', () => {
  let component: AlgoFilterComponent;
  let fixture: ComponentFixture<AlgoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
