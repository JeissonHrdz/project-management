 export interface TaskCreateDTO {
    title: string;
    description: string;
    project_id: number;
    sprint_id: number;
    backlog_item_id: number;
    priority: string;
    type: string;   
    estimated_hours: number;
    start_date: string;
    end_date: string;  
    status: string;
 }