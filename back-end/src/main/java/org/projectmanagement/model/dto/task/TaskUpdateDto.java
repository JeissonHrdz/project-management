package org.projectmanagement.model.dto.task;

import org.projectmanagement.model.enums.TaskPriority;
import org.projectmanagement.model.enums.TaskStatus;
import org.projectmanagement.model.enums.TaskType;

import java.sql.Timestamp;

public record TaskUpdateDto(
    String title,
    String description,
    Integer sprint_id,
    TaskStatus status,
    TaskPriority priority,
    TaskType type,
    Integer story_points,
    Double estimate_hours,
    Double actual_hours,
    String blockers,
    Timestamp start_date,
    Timestamp end_date

) {
}
