import { Component, inject } from '@angular/core';
import { CalendarEvent } from '../../core/model/entity/calendar-event';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  private calendarService = inject(CalendarService);

  currentMonth: Date = new Date();
  daysInMonth: Date[] = [];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  events: CalendarEvent[] = [];

  ngOnInit(): void {
    this.generateCalendar();
   
    this.calendarService.addEvent({
      id: 1,
      title: 'Event 1',
      startDate: new Date('2025-09-02'),
      endDate: this.addDayDate(new Date('2025-09-20')),
      status: 'pending'
    });

    
    this.calendarService.addEvent({
      id: 2,
      title: 'Event 2',
      startDate: new Date('2025-09-05'),
      endDate: this.addDayDate(new Date('2025-09-15')),
      status: 'pending'
    });

    this.calendarService.events$.subscribe(events => {
      this.events = events;
    });
  }

  addDayDate(date: Date): Date{   
    const plusDate = new Date(date);
    plusDate.setDate(plusDate.getDate() + 1);
    return plusDate;    
  }


  generateCalendar(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Ajuste para mostrar días en orden de semana (comenzando domingo)
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      days.push(new Date(year, month, i - startDay + 1));
    }

    for (let d = firstDay.getDate(); d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    this.daysInMonth = days;
  }

  private normalizeEndDate(date: Date): Date {
    const normalized = new Date(date);
    normalized.setHours(23, 59, 59, 999); // último milisegundo del día
    return normalized;
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateCalendar();
  }

  prevMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateCalendar();
  }

  isToday(day: Date): boolean {
    const today = new Date();
    return today.toDateString() === day.toDateString();
  }

  selectDay(day: Date): void {
    // this.selectedDate = day;
    // this.showModal = true;
  }

  getEventsForDay(day: Date): { event: CalendarEvent, position: 'start' | 'middle' | 'end' | 'single' }[] {
    return this.events
      .filter(ev => {
        const start = new Date(ev.startDate);
        const end = this.normalizeEndDate(new Date(ev.endDate ?? ev.startDate));
        console.log(start, end);
        return day >= start && day <= end;
      })
      .map(ev => {
        const start = new Date(ev.startDate);
        const end = this.normalizeEndDate(new Date(ev.endDate ?? ev.startDate));
  
        if (start.toDateString() === end.toDateString()) {
          return { event: ev, position: 'single' };
        } else if (day.toDateString() === start.toDateString()) {
          return { event: ev, position: 'start' };
        } else if (day.toDateString() === end.toDateString()) {
          return { event: ev, position: 'end' };
        } else {
          return { event: ev, position: 'middle' };
        }
      });
  }

}
