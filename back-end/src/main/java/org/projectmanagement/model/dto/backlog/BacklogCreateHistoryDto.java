package org.projectmanagement.model.dto.backlog;

public record BacklogCreateHistoryDto(
        String title,
        String description,
        String acceptance_criteria,
        Integer priority,
        Integer story_points,
        String type,
        Integer project_id,
        Integer epic_id
) {
}
