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
    this.selectedDate = date.fullDate;
  }

  public closeMonthSelector(evt) {
    this.showMonthSelector = false;
  }

  public updateMonth(evt) {
    const month = evt;
    this.buildActiveDate(null, month, null, null);
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
  }

  public getNextMonth() {
    const nextMonth = this.activeDate.add(1, 'months');
    this.setActiveDate(nextMonth);
  }

  private buildActiveDate(year = null, month = null, date = null, fullDate = null) {
    if (fullDate) {
      this.setActiveDate(fullDate);
      return;
    }
    const currentYear = moment(this.activeDate).year();
    const currentMonth = moment(this.activeDate).month();
    const currentDate = moment(this.activeDate).date();
    const newYear = (year === null) ? currentYear : year;
    let newMonth = (month === null) ? currentMonth : month;
    let newDate = (date === null) ? currentDate : date;

    newMonth = (newMonth < 10) ? '0' + newMonth : newMonth;
    newDate = (newDate < 10) ? '0' + newDate : newDate;

    const activeDate = `${newYear}-${newMonth}-${newDate}`;
    this.setActiveDate(activeDate);
  }

  private setActiveDate(date) {
    this.activeDate = moment(date);
    this.generateCalendar();
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
          fullDate: '',
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
        index: idx + 1
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
        fullDate: fullDate,
        offset: moment(fullDate).day(),
        isImportant: important
      });
      startOfMonth.add(1, 'days');
    }
    this.dates = dates;
    this.setOffset();
  }
}
