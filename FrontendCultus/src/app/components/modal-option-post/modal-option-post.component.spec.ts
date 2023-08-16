import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptionPostComponent } from './modal-option-post.component';

describe('ModalOptionPostComponent', () => {
  let component: ModalOptionPostComponent;
  let fixture: ComponentFixture<ModalOptionPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalOptionPostComponent]
    });
    fixture = TestBed.createComponent(ModalOptionPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
