import { TimestampProvider } from "rxjs";

export interface Sprint {
    sprint_id: number;
    project_id: number
    name: string;
    goal: string;
    start_date: string;
    end_date: string;
    status: string;
    estimated_velocity: number;
    actual_velocity: number;   
    createdAt: TimestampProvider; 
    updatedAt: TimestampProvider
    
}