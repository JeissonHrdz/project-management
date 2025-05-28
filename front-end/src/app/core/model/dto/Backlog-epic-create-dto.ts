export interface BacklogEpicCreateDTO {
    project_id: number;
    title: string;
    description: string;
    acceptance_criteria: string;
    priority: number;    
    type: string;
}