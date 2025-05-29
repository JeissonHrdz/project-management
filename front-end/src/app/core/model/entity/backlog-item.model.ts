 
 export interface BacklogItem {
    item_id: number;    
    project_id: number;
    title: string;
    description: string;
    acceptance_criteria: string;
    priority: number;
    story_points: number;
    type: string;
    epic_id: string;
    status: string;   
    created_at: string;
    updated_at: string;
  }