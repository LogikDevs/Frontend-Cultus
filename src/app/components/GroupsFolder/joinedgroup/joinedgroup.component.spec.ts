import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedgroupComponent } from './joinedgroup.component';

describe('JoinedgroupComponent', () => {
  let component: JoinedgroupComponent;
  let fixture: ComponentFixture<JoinedgroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinedgroupComponent]
    });
    fixture = TestBed.createComponent(JoinedgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
