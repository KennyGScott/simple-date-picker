import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pogo-month-selector',
  templateUrl: './pogo-month-selector.component.html',
  styleUrls: ['./pogo-month-selector.component.scss']
})
export class PogoMonthSelectorComponent implements OnInit {
  /**
   * Property declarations
   */
  private _month = '';
  public monthTable: Array<PogoDatePickerModel.MonthListItem>;

  /**
   * Input & Output declarations
   */
  @Input() monthList: Array<PogoDatePickerModel.MonthListItem> = [];
  @Input() currentDate;
  @Output() monthSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Events
   */
  public selectMonth(month: any): void {
    this.monthSelected.emit(month.index);
    this.close.emit(false);
  }

  public onClose(): void {
    this.close.emit(false);
  }

  /**
   * Component constructor
   */
  constructor() { }

  /**
   * Getters & setters
   */
  set month(month: string) {
    this._month = month;
  }
  get month(): string { return this._month; }

  /**
   * Lifecycle hooks
   */
  ngOnInit() {
    this.buildMonthTable();
  }

  /**
   * Component Methods
   */

  private buildMonthTable() {
    const rows = [];
    const numRows = 4;
    let start = 0;
    let end = 4;
    for (let i = 0, len = this.monthList.length / numRows; i < len; i++)
    {
      const row = this.monthList.slice(start, end);
      start = end;
      end += 4;
      rows.push(row);
    }
    const sorted = rows[0].map((col, i) => rows.map(row => row[i]));
    const monthTable = this.flattenArray(sorted);
    this.monthTable = monthTable;
  }

  /**
   * Helper methods
   */
  private flattenArray(arr) {
    return JSON.parse(`[${JSON.stringify(arr).replace(/\[|\]/g, '')}]`);
  }
}
