import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBackofficeComponent } from './sidebar-backoffice.component';

describe('SidebarBackofficeComponent', () => {
  let component: SidebarBackofficeComponent;
  let fixture: ComponentFixture<SidebarBackofficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarBackofficeComponent]
    });
    fixture = TestBed.createComponent(SidebarBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
