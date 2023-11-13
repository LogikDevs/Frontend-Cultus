import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedgroupsComponent } from './suggestedgroups.component';

describe('SuggestedgroupsComponent', () => {
  let component: SuggestedgroupsComponent;
  let fixture: ComponentFixture<SuggestedgroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestedgroupsComponent]
    });
    fixture = TestBed.createComponent(SuggestedgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
