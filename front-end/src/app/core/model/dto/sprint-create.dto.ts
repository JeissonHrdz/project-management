export interface SprintCreateDTO {
    name: string;
    goal: string;
    start_date: string;
    end_date: string;
    status: string;
    estimated_velocity: number;
    project_id: number;
}