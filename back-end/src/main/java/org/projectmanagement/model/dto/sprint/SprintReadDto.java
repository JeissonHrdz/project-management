package org.projectmanagement.model.dto.sprint;

import org.projectmanagement.model.enums.SprintStatus;

import java.sql.Date;
import java.sql.Timestamp;

public record SprintReadDto(
    Integer sprint_id,
    Integer project_id,
    String name,
    String goal,
    Date start_date,
    Date end_date,
    SprintStatus status,
    Integer estimated_velocity,
    Integer actual_velocity,
    Timestamp created_at
) {
}
