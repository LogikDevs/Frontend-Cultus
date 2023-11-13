import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptionCommentComponent } from './modal-option-comment.component';

describe('ModalOptionCommentComponent', () => {
  let component: ModalOptionCommentComponent;
  let fixture: ComponentFixture<ModalOptionCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalOptionCommentComponent]
    });
    fixture = TestBed.createComponent(ModalOptionCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
