package org.projectmanagement.model.dto.sprint;

import org.projectmanagement.model.enums.SprintStatus;

import java.sql.Date;

public record SprintUpdateDto(
    String name,
    String goal,
    Date start_date,
    Date end_date,
    SprintStatus status,
    Integer estimated_velocity,
    Integer actual_velocity
) {
}
