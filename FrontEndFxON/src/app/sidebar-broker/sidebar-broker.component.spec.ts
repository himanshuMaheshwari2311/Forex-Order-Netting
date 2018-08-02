import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBrokerComponent } from './sidebar-broker.component';

describe('SidebarBrokerComponent', () => {
  let component: SidebarBrokerComponent;
  let fixture: ComponentFixture<SidebarBrokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarBrokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
