import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderGruposComponent } from './slider-grupos.component';

describe('SliderGruposComponent', () => {
  let component: SliderGruposComponent;
  let fixture: ComponentFixture<SliderGruposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderGruposComponent]
    });
    fixture = TestBed.createComponent(SliderGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
