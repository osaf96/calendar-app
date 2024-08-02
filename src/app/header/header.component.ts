import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonToggleModule, DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showWeeklyView: boolean = false;

  @Output() nextMonth = new EventEmitter<void>();
  @Output() prevMonth = new EventEmitter<void>();
  @Output() onToday = new EventEmitter<void>();
  @Output() toggleChange = new EventEmitter<string>();
  @Output() changeCalendarView = new EventEmitter<string>();
  @Input() month!: string;
  @Input() year!: number;
  @Input() day!: string;
  calendarView = CalendarView;
  onNextClick() {
    this.nextMonth.emit();
  }
  onPrevClick() {
    this.prevMonth.emit();
  }
  onTodayClick() {
    this.onToday.emit();
  }
  toggleView(view: string) {
    if (view === this.calendarView.day) {
      this.changeCalendarView.emit(this.calendarView.day);
    } else if (view === this.calendarView.week) {
      this.changeCalendarView.emit(this.calendarView.week);
    } else {
      this.changeCalendarView.emit(this.calendarView.month);
    }
    // this.showWeeklyView = !this.showWeeklyView;
  }
}

export enum CalendarView {
  day = 'day',
  week = 'week',
  month = 'month',
}
