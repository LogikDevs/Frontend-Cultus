import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleeventComponent } from './singleevent.component';

describe('SingleeventComponent', () => {
  let component: SingleeventComponent;
  let fixture: ComponentFixture<SingleeventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleeventComponent]
    });
    fixture = TestBed.createComponent(SingleeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
