import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarView, HeaderComponent } from '../header/header.component';
import { WeeklyViewComponent } from '../weekly-view/weekly-view.component';
import { DailyViewComponent } from '../daily-view/daily-view.component';
import { EventHandlerService } from '../service/event.handler.service';
import { Event } from '../model/event.model';
import { EventFormComponent } from '../event-form/event-form.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EventDetailsDialogComponent } from '../event-details-dialog/event-details-dialog.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    WeeklyViewComponent,
    DailyViewComponent,
    EventFormComponent,
    MatButtonModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  day!: string;
  showWeeklyView: boolean = false;
  selectedToggle: string = 'today';
  currentDate: Date = new Date();
  todayDate: Date = new Date();
  month!: string;
  year!: number;
  calendar: any[] = [];
  events: Event[] = [];
  selectedEvent?: Event;
  private weekDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  private months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  calendarView: string = 'month';
  calendarViewEnum = CalendarView;
  eventHandlerService: EventHandlerService = new EventHandlerService();

  ngOnInit() {
    this.day = this.weekDays[this.todayDate.getDay()];
    this.eventHandlerService.getEvents().subscribe((events) => {
      this.events = events;
      this.generateCalendar(this.currentDate);
    });
  }

  constructor(public dialog: MatDialog) {}

  onEventAdded(newEvent: Event) {
    this.eventHandlerService.addEvent(newEvent);
    this.generateCalendar(this.currentDate); // Regenerate the calendar to show the new event
  }

  private generateCalendar(d: Date) {
    const totalDays = this.monthDays(d);
    const start = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    this.month = this.months[d.getMonth()];
    this.year = d.getFullYear();

    const cal = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0) {
          row.push({ weekDay: this.weekDays[j] });
        } else if (day > totalDays) {
          row.push({ day: null });
        } else {
          if (i === 1 && j < start) {
            row.push({ day: null });
          } else {
            const isToday = this.isToday(day, d.getMonth(), d.getFullYear());
            const currentDay = new Date(d.getFullYear(), d.getMonth(), day);

            const hasEvent = this.events.some((event) => {
              const eventStart = new Date(event.startDate);
              const eventEnd = new Date(event.endDate);
              return currentDay >= eventStart && currentDay <= eventEnd;
            });

            row.push({ day: day++, hover: false, today: isToday, hasEvent });
          }
        }
      }
      cal.push(row);
    }
    this.calendar = cal;
    // this.calendar[start][start].hasEvent = true; // for testing.
  }

  private monthDays(d: Date): number {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  }

  private isToday(day: number, month: number, year: number): boolean {
    return (
      day === this.todayDate.getDate() &&
      month === this.todayDate.getMonth() &&
      year === this.todayDate.getFullYear()
    );
  }

  onNextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendar(this.currentDate);
  }

  onPrevMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendar(this.currentDate);
  }

  onToday() {
    this.currentDate = new Date();
    this.generateCalendar(this.currentDate);
  }

  onChangeCalendarView(view: string) {
    this.calendarView = view;
  }

  onEventDotClick(day: number, month: number, year: number) {
    const selectedDate = new Date(year, month, day);
    this.selectedEvent = this.events.find((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return selectedDate >= eventStart && selectedDate <= eventEnd;
    });
  }

  openDialog(day: number, month: number, year: number) {
    const selectedDate = new Date(year, month, day);
    const event = this.events.find((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return selectedDate >= eventStart && selectedDate <= eventEnd;
    });
    console.log('Selected event:', event);

    if (event) {
      this.dialog.open(EventDetailsDialogComponent, {
        data: {
          title: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          location: event.location,
          description: event.description,
        },
        width: '600px',
        height: '400px',
      });
    }
  }
}
