export interface CalendarEvent {
    id: number;
    title: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    status?: 'pending' | 'in-progress' | 'done';
}