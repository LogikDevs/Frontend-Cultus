import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsSearchComponent } from './interests-search.component';

describe('InterestsSearchComponent', () => {
  let component: InterestsSearchComponent;
  let fixture: ComponentFixture<InterestsSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterestsSearchComponent]
    });
    fixture = TestBed.createComponent(InterestsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
