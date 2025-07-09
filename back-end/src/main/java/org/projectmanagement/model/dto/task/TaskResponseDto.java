package org.projectmanagement.model.dto.task;

import org.projectmanagement.model.enums.TaskPriority;
import org.projectmanagement.model.enums.TaskStatus;
import org.projectmanagement.model.enums.TaskType;

import java.sql.Timestamp;

public record TaskResponseDto(
    Integer task_id,
    Integer sprint_id,
    String title,
    String description,
    TaskStatus status,
    TaskPriority priority,
    TaskType type,
    Double estimate_hours,
    Integer story_points,
    Timestamp start_date,
    Timestamp end_date
) {
}
