import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellDetailViewComponent } from './well-detail-view.component';

describe('WellDetailViewComponent', () => {
  let component: WellDetailViewComponent;
  let fixture: ComponentFixture<WellDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
