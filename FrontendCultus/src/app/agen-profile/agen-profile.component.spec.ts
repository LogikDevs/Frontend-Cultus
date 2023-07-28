import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenProfileComponent } from './agen-profile.component';

describe('AgenProfileComponent', () => {
  let component: AgenProfileComponent;
  let fixture: ComponentFixture<AgenProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenProfileComponent]
    });
    fixture = TestBed.createComponent(AgenProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
