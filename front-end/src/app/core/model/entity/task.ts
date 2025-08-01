import { TimestampProvider } from "rxjs";

export interface Task {
    task_id: number;
    title: string;
    description: string;
    project_id: number;
    sprint_id: number;
    backlog_item_id: number;
    priority: string;
    type: string;
    story_points: number;
    estimate_hours: number;
    actual_hours: number;
    blockers: string;
    start_date: string;
    end_date: string;
    status: string;
    createdAt: TimestampProvider; 
    updatedAt: TimestampProvider 
}