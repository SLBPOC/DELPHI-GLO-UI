import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWellInfoAlertComponent } from './well-info-alert.component';

describe('AppWellInfoAlertComponent', () => {
  let component: AppWellInfoAlertComponent;
  let fixture: ComponentFixture<AppWellInfoAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppWellInfoAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppWellInfoAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
