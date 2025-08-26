package org.projectmanagement.model.dto.comment;

public record CommentUpdateDto(
        String content,
        boolean is_edited
) {
}
