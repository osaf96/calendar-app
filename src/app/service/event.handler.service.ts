import { Injectable } from '@angular/core';
import { Event } from '../model/event.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventHandlerService {
  private eventsSubject = new BehaviorSubject<Event[]>([]);
  events$ = this.eventsSubject.asObservable();

  addEvent(event: Event) {
    const currentEvents = this.eventsSubject.value;
    this.eventsSubject.next([...currentEvents, event]);
  }
  updateEvent(event: Event) {
    const currentEvents = this.eventsSubject.value;
    const index = currentEvents.findIndex((e) => e.id === event.id);
    currentEvents[index] = event;
    this.eventsSubject.next([...currentEvents]);
  }
  getEvents(): Observable<Event[]> {
    return this.events$;
  }
}
