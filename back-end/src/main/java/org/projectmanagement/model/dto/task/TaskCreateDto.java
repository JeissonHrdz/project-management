package org.projectmanagement.model.dto.task;

import org.projectmanagement.model.enums.TaskPriority;
import org.projectmanagement.model.enums.TaskStatus;
import org.projectmanagement.model.enums.TaskType;

import java.sql.Timestamp;

public record TaskCreateDto(
    String title,
    String description,
    Integer backlog_item_id,
    Integer project_id,
    Integer sprint_id,
    TaskStatus status,
    TaskPriority priority,
    TaskType type,
    Integer story_points,
    String blockers,
    Double estimated_hours,
    Timestamp start_date,
    Timestamp end_date
) {
}
