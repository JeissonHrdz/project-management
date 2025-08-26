import { TimestampProvider } from "rxjs";

 export interface Comment {
    comment_id: number;
    task_id: number;
    user_id: string;
    content: string;
    created_at: TimestampProvider;
    updated_at: TimestampProvider;
    
 }
 