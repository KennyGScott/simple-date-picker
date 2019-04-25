import { Component } from '@angular/core';
import * as moment_ from 'moment'
const moment = moment_;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Date Picker';
  public showDatePicker = false;
  public dateSelected: string;

  constructor(){
    this.dateSelected = moment().format('YYYY-MM-DD')
  }

  setDate(evt) {
    this.dateSelected = evt
  }

}

