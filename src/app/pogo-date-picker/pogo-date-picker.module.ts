import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PogoDatePickerComponent } from './pogo-date-picker.component';
import { PogoMonthSelectorComponent } from './components/pogo-month-selector/pogo-month-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [PogoDatePickerComponent, PogoMonthSelectorComponent],
  exports: [PogoDatePickerComponent]
})
export class PogoDatePickerModule { }
