import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellViewTabsComponent } from './well-view-tabs.component';

describe('WellViewTabsComponent', () => {
  let component: WellViewTabsComponent;
  let fixture: ComponentFixture<WellViewTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellViewTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellViewTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
