package org.projectmanagement.model.dto.backlog;

import java.sql.Timestamp;

public record BacklogReadItemDto(
    Integer item_id,
    String title,
    String description,
    String acceptance_criteria,
    Integer priority,
    Integer story_points,
    Integer epic_id,
    String type,
    Integer project_id,
    Timestamp created_at
) {
}
