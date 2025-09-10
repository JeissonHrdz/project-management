import { Component } from '@angular/core';
import { CalendarEvent } from '../../core/model/entity/calendar-event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  currentMonth: Date = new Date();
  daysInMonth: Date[] = [];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  events: CalendarEvent[] = [];


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

}
