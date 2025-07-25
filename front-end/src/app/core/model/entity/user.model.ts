import { Timestamp, TimestampProvider } from "rxjs";

export interface User {
    user_id: string;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role_id: number;
    is_scrum_master: boolean;
    is_product_owner: boolean;
    last_login: string;
    createdAt: TimestampProvider;
    updatedAt: TimestampProvider
    
    
}