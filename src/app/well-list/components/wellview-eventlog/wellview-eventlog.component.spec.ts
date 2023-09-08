import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellviewEventlogComponent } from './wellview-eventlog.component';

describe('WellviewEventlogComponent', () => {
  let component: WellviewEventlogComponent;
  let fixture: ComponentFixture<WellviewEventlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellviewEventlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellviewEventlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
