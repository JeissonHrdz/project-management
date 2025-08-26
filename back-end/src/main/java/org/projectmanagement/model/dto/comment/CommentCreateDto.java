package org.projectmanagement.model.dto.comment;

public record CommentCreateDto(
        String content,
        Integer task_id,
        String user_id
) {
}
