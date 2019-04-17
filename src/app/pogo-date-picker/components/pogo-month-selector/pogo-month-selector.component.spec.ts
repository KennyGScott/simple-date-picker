import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PogoMonthSelectorComponent } from './pogo-month-selector.component';

describe('PogoMonthSelectorComponent', () => {
  let component: PogoMonthSelectorComponent;
  let fixture: ComponentFixture<PogoMonthSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PogoMonthSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PogoMonthSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
