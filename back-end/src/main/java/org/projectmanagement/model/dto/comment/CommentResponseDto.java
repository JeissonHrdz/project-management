package org.projectmanagement.model.dto.comment;

import java.sql.Date;
import java.sql.Timestamp;

public record CommentResponseDto(
        Integer comment_id,
        String content,
        Integer task_id,
        String user_id,
        boolean is_edited,
        Timestamp created_at,
        Timestamp updated_at
) {
}
