import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInterestsComponent } from './event-interests.component';

describe('EventInterestsComponent', () => {
  let component: EventInterestsComponent;
  let fixture: ComponentFixture<EventInterestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventInterestsComponent]
    });
    fixture = TestBed.createComponent(EventInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
