import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'simple-year-selector',
  templateUrl: './simple-year-selector.component.html',
  styleUrls: ['./simple-year-selector.component.scss']
})
export class SimpleYearSelectorComponent implements OnInit {

  /**
   * Property declarations
   */
  private _year: number;
  private _years: Array<number>;
  public pagedYears: Array<any>;
  public currentPage: number;
  /**
   * Input & Output declarations
   */
  @Input() currentYear: number;
  @Output() yearSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Events
   */
  public selectYear(year: number): void {
    this.yearSelected.emit(year);
    this.close.emit(false);
  }

  public onClose(): void {
    this.close.emit(false);
  }

  /**
   * Component constructor
   */
  constructor() {
    this.currentPage = 1;
  }

  /**
   * Getters & setters
   */
  set year(year: number) { this._year = year; }
  get year(): number { return this._year; }
  set years(years: Array<any>) { this._years = years; }
  get years(): Array<any> { return this._years; }

  /**
   * Lifecycle hooks
   */
  ngOnInit() {
    this.generateYears();
    this.setPagedYears(1);
    this.getCurrentPage();
  }

  /**
   * Component Methods
   */
  generateYears() {
    const minYear = 100;
    const maxYear = 10000;
    const years = [];
    for (let i = maxYear; i > minYear - 1; i--)
    {
      years.unshift(i);
    }
    this.years = years;
    this.buildPagedYears();
  }
  getPrevPage() {
    this.currentPage -= 1;
    this.setPagedYears();
  }
  getNextPage() {
    this.currentPage += 1;
    this.setPagedYears();
  }

  getCurrentPage() {
    const pagedYears = this.pagedYears;
    let currentPage = this.currentPage;
    pagedYears.forEach((years, page) => {
      years.forEach((year) => {
        if (year === 2019)
        {
          currentPage = page;
        }
      })
    });
    this.setPagedYears(currentPage);
  }

  buildPagedYears(page = 1) {
    const years = this.years;
    const yearsPerPage = 24 - 9;
    const numPages = years.length / yearsPerPage;
    const pages = [];
    page--;
    for (let i = 0; i < numPages; i++)
    {
      pages.push(years.slice(i * yearsPerPage, (i + 1) * yearsPerPage));
    }
    this.pagedYears = pages;
  }

  setPagedYears(page = this.currentPage) {
    this.currentPage = page;
    this.years = this.pagedYears[page];
  }

}
