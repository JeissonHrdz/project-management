package org.projectmanagement.model.dto.comment;

public record CommentUpdateDto(
        Integer comment_id,
        String content,
        boolean is_edited
) {
}
