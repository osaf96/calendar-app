import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Signal,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { EventHandlerService } from '../service/event.handler.service';
import { Event } from '../model/event.model';
@Component({
  selector: 'app-event-form',
  standalone: true,
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
})
export class EventFormComponent {
  eventForm: FormGroup;
  eventsArray: Event[] = [];

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
      location: [''],
    });
  }

  @Output() eventAdded = new EventEmitter<Event>();

  onSubmit() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const newEvent: Event = {
        id: new Date().getTime(), //unique ID
        title: formValue.title,
        startDate: new Date(formValue.startDate),
        endDate: new Date(formValue.endDate),
        location: formValue.location || '',
        description: formValue.description || '',
      };

      this.eventAdded.emit(newEvent);
      this.eventForm.reset();
    }
  }
}
