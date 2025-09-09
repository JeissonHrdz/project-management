export interface CommentReadDTO {
    comment_id: number;
    task_id: number;
    user_id: string;
    content: string;
    is_edited: boolean;
    created_at: string;
    updated_at: string;
    
 }