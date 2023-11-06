import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedeventsComponent } from './suggestedevents.component';

describe('SuggestedeventsComponent', () => {
  let component: SuggestedeventsComponent;
  let fixture: ComponentFixture<SuggestedeventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestedeventsComponent]
    });
    fixture = TestBed.createComponent(SuggestedeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
