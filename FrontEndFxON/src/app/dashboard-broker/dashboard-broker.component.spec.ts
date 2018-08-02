import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBrokerComponent } from './dashboard-broker.component';

describe('DashboardBrokerComponent', () => {
  let component: DashboardBrokerComponent;
  let fixture: ComponentFixture<DashboardBrokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBrokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
