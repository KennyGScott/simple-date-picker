import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'pogo-date-picker',
  templateUrl: './pogo-date-picker.component.html',
  styleUrls: ['./pogo-date-picker.component.scss']
})

export class PogoDatePickerComponent implements OnInit {
  /**
   * Property declarations
   */
  public dates: Array<PogoDatePickerModel.CalendarDate>;
  public dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public monthList: Array<PogoDatePickerModel.MonthListItem>;
  public activeDate;
  public selectedDate;
  public showMonthSelector: boolean;

  /**
   * Input & Output declarations
   */
  @Input() importantDates: Array<any>;

  /**
   * Events
   */

  /**
   * Component constructor
   */
  constructor() {
    this.dates = new Array<PogoDatePickerModel.CalendarDate>();
    this.activeDate = moment(new Date());
    this.selectedDate = this.activeDate;
  }

  /**
   * Getters & setters
   */

  /**
   * Lifecycle hooks
   */
  ngOnInit() {
    this.generateCalendar();
    this.generateMonthList();
  }

  /**
   * Component Methods
   */
  public setDate(date) {
    this.selectedDate = date.fulldate;
    console.log(this.selectedDate);
    console.log(this.selectedDate === date.fulldate);
  }

  public closeMonthSelector(evt) {
    this.showMonthSelector = false;
  }

  public updateMonth(evt) {
    console.log(evt);
  }
  public getActiveDate(date = this.activeDate) {
    const activeMonth = moment(date).format('MMMM');
    const activeYear = moment(date).format('YYYY');
    return {
      month: activeMonth,
      year: activeYear
    };
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
