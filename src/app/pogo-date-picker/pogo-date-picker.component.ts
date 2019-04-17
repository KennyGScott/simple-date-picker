import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'pogo-date-picker',
  templateUrl: './pogo-date-picker.component.html',
  styleUrls: ['./pogo-date-picker.component.scss']
})

export class PogoDatePickerComponent implements OnInit {
  @Input() importantDates: Array<any>;
  public dates: Array<PogoDatePickerModel.CalendarDate>;
  public dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public monthList: Array<PogoDatePickerModel.MonthListItem>;
  public activeDate;
  public selectedDate;
  constructor(private renderer: Renderer2) {
    this.dates = new Array<PogoDatePickerModel.CalendarDate>();
    this.activeDate = moment(new Date());
    this.selectedDate = this.activeDate;
  }

  ngOnInit() {
    this.generateCalendar();
    this.generateMonthList();
  }

  public setDate(date) {
    this.selectedDate = moment(date, 'YYYY-MM-DD').toString();
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
    if (offset !== null)
    {
      for (let i = 0; i < offset; i++)
      {
        this.dates.unshift({
          dayName: '',
          dayOfMonth: '00',
          fulldate: '',
          offset: null,
          isImportant: false
        });
      }
    }
  }

  private generateMonthList() {
    const monthList = new Array<PogoDatePickerModel.MonthListItem>();
    const months = moment.monthsShort();
    months.forEach((month, idx) => {
      monthList.push({
        name: month,
        index: idx
      });
    });
    this.monthList = monthList;
  }

  private generateCalendar(direction = null) {
    const currentDate = moment(this.activeDate);
    const month = moment(currentDate).month() + 1;
    const year = currentDate.year();
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('month');
    const dates = new Array<PogoDatePickerModel.CalendarDate>();
    for (let i = startOfMonth.date(); i <= endOfMonth.date(); i++)
    {
      const date = (`${month}/${i}/${year}`).toString();
      const fullDate = moment(date, 'MM/D/YYYY').format('YYYY-MM-DD');
      const day = fullDate.split('-')[2];
      const important = (this.importantDates !== null) ? this.importantDates.includes(fullDate) : false;
      dates.push({
        dayName: this.dayNames[startOfMonth.day()],
        dayOfMonth: day,
        fulldate: fullDate,
        offset: moment(fullDate).day(),
        isImportant: important
      });
      startOfMonth.add(1, 'days');
    }
    this.dates = dates;
    this.setOffset();
  }
}
