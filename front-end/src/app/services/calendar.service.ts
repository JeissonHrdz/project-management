import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent } from '../core/model/entity/calendar-event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private eventsSubject = new BehaviorSubject<CalendarEvent[]>([]);
  events$ = this.eventsSubject.asObservable();

  private events: CalendarEvent[] = [];

  addEvent(event: CalendarEvent): void {
    this.events.push(event);
    this.eventsSubject.next(this.events);
  }

  removeEvent(id: number): void {
    this.events = this.events.filter(e => e.id !== id);
    this.eventsSubject.next(this.events);
  }
}
