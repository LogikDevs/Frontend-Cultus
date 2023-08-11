import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverySectionComponent } from './discovery-section.component';

describe('DiscoverySectionComponent', () => {
  let component: DiscoverySectionComponent;
  let fixture: ComponentFixture<DiscoverySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverySectionComponent]
    });
    fixture = TestBed.createComponent(DiscoverySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
