import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellviewAlertComponent } from './wellview-alert.component';

describe('WellviewAlertComponent', () => {
  let component: WellviewAlertComponent;
  let fixture: ComponentFixture<WellviewAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellviewAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellviewAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
