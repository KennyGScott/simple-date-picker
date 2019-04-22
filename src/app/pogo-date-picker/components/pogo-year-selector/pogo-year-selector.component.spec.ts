import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PogoYearSelectorComponent } from './pogo-year-selector.component';

describe('PogoYearSelectorComponent', () => {
  let component: PogoYearSelectorComponent;
  let fixture: ComponentFixture<PogoYearSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PogoYearSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PogoYearSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
