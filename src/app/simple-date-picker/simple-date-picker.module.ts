import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SimpleDatePickerComponent } from './simple-date-picker.component';
import { SimpleMonthSelectorComponent } from './components/simple-month-selector/simple-month-selector.component';
import { SimpleYearSelectorComponent } from './components/simple-year-selector/simple-year-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SimpleDatePickerComponent, SimpleMonthSelectorComponent, SimpleYearSelectorComponent],
  exports: [SimpleDatePickerComponent]
})
export class SimpleDatePickerModule { }
