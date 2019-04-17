import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PogoDatePickerComponent } from './pogo-date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [PogoDatePickerComponent],
  exports: [PogoDatePickerComponent]

})
export class PogoDatePickerModule { }
