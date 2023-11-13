import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateconversationsComponent } from './privateconversations.component';

describe('PrivateconversationsComponent', () => {
  let component: PrivateconversationsComponent;
  let fixture: ComponentFixture<PrivateconversationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateconversationsComponent]
    });
    fixture = TestBed.createComponent(PrivateconversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
