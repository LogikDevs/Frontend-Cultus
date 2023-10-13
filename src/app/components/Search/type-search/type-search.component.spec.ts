import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSearchComponent } from './type-search.component';

describe('TypeSearchComponent', () => {
  let component: TypeSearchComponent;
  let fixture: ComponentFixture<TypeSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeSearchComponent]
    });
    fixture = TestBed.createComponent(TypeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
