import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Date Picker';
  public showDatePicker = false;
  public dateSelected = '';

  setDate(evt) {
    this.dateSelected = evt
  }

}

