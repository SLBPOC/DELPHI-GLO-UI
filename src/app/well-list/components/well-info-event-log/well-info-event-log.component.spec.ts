import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellInfoEventLogComponent } from './well-info-event-log.component';

describe('WellInfoEventLogComponent', () => {
  let component: WellInfoEventLogComponent;
  let fixture: ComponentFixture<WellInfoEventLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellInfoEventLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellInfoEventLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
