import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficePostComponent } from './backoffice-post.component';

describe('BackofficePostComponent', () => {
  let component: BackofficePostComponent;
  let fixture: ComponentFixture<BackofficePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackofficePostComponent]
    });
    fixture = TestBed.createComponent(BackofficePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
