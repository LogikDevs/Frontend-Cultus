import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedeventComponent } from './joinedevent.component';

describe('JoinedeventComponent', () => {
  let component: JoinedeventComponent;
  let fixture: ComponentFixture<JoinedeventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinedeventComponent]
    });
    fixture = TestBed.createComponent(JoinedeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
