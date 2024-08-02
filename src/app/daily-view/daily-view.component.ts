import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-daily-view',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, HeaderComponent],
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss'],
})
export class DailyViewComponent implements OnInit {
  hours: string[] = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  selectedDay: any; // Object to store the selected day

  ngOnInit() {
    this.selectedDay = this.getCurrentDay();
  }

  private getCurrentDay() {
    const today = new Date();
    return {
      date: today,
      dayName: today.toLocaleDateString('en-US', { weekday: 'long' }),
    };
  }
}
