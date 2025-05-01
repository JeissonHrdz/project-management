package org.projectmanagement.model.dto.backlog;

public record BacklogCreateEpicDto(
    String title,
    String description,
    String acceptance_criteria,
    Integer priority,
    String type,
    Integer project_id
) {
}
