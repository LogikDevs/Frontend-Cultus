import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglegroupComponent } from './singlegroup.component';

describe('SinglegroupComponent', () => {
  let component: SinglegroupComponent;
  let fixture: ComponentFixture<SinglegroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglegroupComponent]
    });
    fixture = TestBed.createComponent(SinglegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
