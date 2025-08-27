package org.projectmanagement.model.dto.comment;

import java.sql.Date;

public record CommentReadDto(
        Integer comment_id,
        Integer task_id,
        String user_id,
        String content,
        boolean is_edited,
        Date created_at,
        Date updated_at
) {
}
