import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { EventHandlerService } from '../service/event.handler.service';
import { Event } from '../model/event.model';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsDialogComponent } from '../event-details-dialog/event-details-dialog.component';

@Component({
  selector: 'app-weekly-view',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    HeaderComponent,
    CdkDrag,
  ],
  templateUrl: './weekly-view.component.html',
  styleUrls: ['./weekly-view.component.scss'],
})
export class WeeklyViewComponent implements OnInit {
  hours: string[] = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  week: any[] = [];
  startOfWeek!: Date;
  endOfWeek!: Date;
  currentDate: Date = new Date();
  events: Event[] = [];

  constructor(
    private eventHandlerService: EventHandlerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.eventHandlerService.getEvents().subscribe((events) => {
      this.events = events;
      this.generateWeek(new Date());
    });
  }

  private generateWeek(d: Date) {
    const startOfWeek = this.getStartOfWeek(d);
    const endOfWeek = this.getEndOfWeek(startOfWeek);

    this.startOfWeek = startOfWeek;
    this.endOfWeek = endOfWeek;

    this.week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const hasEvent = this.events.some((event) => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        return day >= eventStart && day <= eventEnd;
      });
      this.week.push({
        date: day,
        dayName: day.toLocaleDateString('en-US', { weekday: 'long' }),
        formattedDate: day.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        hasEvent,
      });
    }
  }

  private getStartOfWeek(date: Date): Date {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    return startOfWeek;
  }

  private getEndOfWeek(startOfWeek: Date): Date {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return endOfWeek;
  }

  onEventAdded(newEvent: Event) {
    this.eventHandlerService.addEvent(newEvent);
    this.generateWeek(this.currentDate);
  }

  openDialog(day: Date) {
    const event = this.events.find((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return day >= eventStart && day <= eventEnd;
    });

    if (event) {
      this.dialog.open(EventDetailsDialogComponent, {
        width: '600px',
        height: '400px',
        data: {
          title: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          location: event.location,
          description: event.description,
        },
      });
    }
  }
}
