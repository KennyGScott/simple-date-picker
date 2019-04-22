import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PogoDatePickerComponent } from './pogo-date-picker.component';
import { PogoMonthSelectorComponent } from './components/pogo-month-selector/pogo-month-selector.component';
import { PogoYearSelectorComponent } from './components/pogo-year-selector/pogo-year-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [PogoDatePickerComponent, PogoMonthSelectorComponent, PogoYearSelectorComponent],
  exports: [PogoDatePickerComponent]
})
export class PogoDatePickerModule { }
