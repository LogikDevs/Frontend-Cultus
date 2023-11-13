import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedSectionComponent } from './followed-section.component';

describe('FollowedSectionComponent', () => {
  let component: FollowedSectionComponent;
  let fixture: ComponentFixture<FollowedSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowedSectionComponent]
    });
    fixture = TestBed.createComponent(FollowedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
