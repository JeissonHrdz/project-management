package org.projectmanagement.model.dto.comment;

import java.sql.Date;
import java.sql.Timestamp;

public record CommentReadDto(
        Integer comment_id,
        Integer task_id,
        String user_id,
        String content,
        boolean is_edited,
        Timestamp created_at,
        Timestamp updated_at
) {
}
