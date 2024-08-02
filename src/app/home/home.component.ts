import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { WeeklyViewComponent } from '../weekly-view/weekly-view.component';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CalendarComponent,
    WeeklyViewComponent,
    EventFormComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
