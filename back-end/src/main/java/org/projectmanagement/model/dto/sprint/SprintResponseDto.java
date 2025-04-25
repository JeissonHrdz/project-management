package org.projectmanagement.model.dto.sprint;

import org.projectmanagement.model.enums.SprintStatus;

import java.util.Date;

public record SprintResponseDto(
    Integer sprint_id,
    Integer project_id,
    String name,
    String goal,
    Date start_date,
    Date end_date,
    SprintStatus status
) {
}
