import { Timestamp, TimestampProvider } from "rxjs";

export interface Project {
    project_id: number;
    name: string;
    description: string;
    product_owner_id: string;
    scrum_master_id: string;
    start_date: string;
    estimated_end_date: string;
    actual_end_date: string;
    definition_of_done: string;
    status: string;
    createdAt: TimestampProvider
    updatedAt: TimestampProvider


}