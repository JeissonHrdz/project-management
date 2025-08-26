package org.projectmanagement.model.dto.comment;

import java.sql.Date;

public record CommentReadDto(
        Integer comment_id,
        String content,
        Integer task_id,
        String user_id,
        boolean is_edited,
        Date created_at,
        Date updated_at
) {
}
