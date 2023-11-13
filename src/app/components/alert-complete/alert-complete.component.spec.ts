import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCompleteComponent } from './alert-complete.component';

describe('AlertCompleteComponent', () => {
  let component: AlertCompleteComponent;
  let fixture: ComponentFixture<AlertCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertCompleteComponent]
    });
    fixture = TestBed.createComponent(AlertCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
