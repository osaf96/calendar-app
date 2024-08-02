import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-details-dialog',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event-details-dialog.component.html',
  styleUrl: './event-details-dialog.component.scss',
})
export class EventDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Dialog data:', data);
  }
}
