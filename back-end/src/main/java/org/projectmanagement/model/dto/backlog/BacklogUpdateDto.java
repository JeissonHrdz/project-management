package org.projectmanagement.model.dto.backlog;

public record BacklogUpdateDto(
    String title,
    String description,
    String acceptance_criteria,
    Integer priority,
    Integer story_points,
    String type,
    Integer epic_id
) {
}
