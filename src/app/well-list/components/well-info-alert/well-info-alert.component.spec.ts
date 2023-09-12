import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellInfoAlertComponent } from './well-info-alert.component';

describe('WellInfoAlertComponent', () => {
  let component: WellInfoAlertComponent;
  let fixture: ComponentFixture<WellInfoAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellInfoAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellInfoAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
