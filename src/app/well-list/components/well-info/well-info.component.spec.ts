import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellInfoComponent } from './well-info.component';

describe('WellInfoComponent', () => {
  let component: WellInfoComponent;
  let fixture: ComponentFixture<WellInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
