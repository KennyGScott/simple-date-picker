import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

export interface IcalDate {
  dayName: string;
  dayOfMonth: string;
  fulldate: string;
  offset: number;
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'pogo-date-picker',
  templateUrl: './pogo-date-picker.component.html',
  styleUrls: ['./pogo-date-picker.component.scss']
})
export class PogoDatePickerComponent implements OnInit {

  public dates: Array<IcalDate>;
  public dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public activeDate;
  public currentDate;
  constructor() {
    this.dates = new Array<IcalDate>();
    this.activeDate = moment(new Date());
  }

  ngOnInit() {
    this.generateCalendar();
  }

  public getActiveDate(date = this.activeDate) {
    return moment(date).format('MMMM YYYY');
  }

  public getPrevMonth() {
    const prevMonth = this.activeDate.subtract(1, 'months');
    this.setActiveDate(prevMonth);
    this.generateCalendar();
  }

  public getNextMonth() {
    const nextMonth = this.activeDate.add(1, 'months');
    this.setActiveDate(nextMonth);
    this.generateCalendar();
  }

  private setActiveDate(date) {
    this.activeDate = date;
  }

  private setOffset() {
    const offset = this.dates[0].offset;
    if (offset !== null) {
      for (let i = 0; i < offset; i++)
      {
        this.dates.unshift({
          dayName: '',
          dayOfMonth: '00',
          fulldate: '',
          offset: null
        });
      }
    }
  }

  private generateCalendar(direction = null) {
    const currentDate = moment(this.activeDate);
    const month = moment(currentDate).month() + 1;
    const year = currentDate.year();
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('month');
    const dates = new Array<IcalDate>();
    for (let i = startOfMonth.date(); i <= endOfMonth.date(); i++)
    {
      const date = (`${month}/${i}/${year}`).toString();
      const fullDate = moment(date, 'MM/D/YYYY').format('YYYY-MM-DD');
      const day = fullDate.split('-')[2];
      dates.push({
        dayName: this.dayNames[startOfMonth.day()],
        dayOfMonth: day,
        fulldate: fullDate,
        offset: moment(fullDate).day()
      });
      startOfMonth.add(1, 'days');
    }
    this.dates = dates;
    this.setOffset();
  }
}
