package org.projectmanagement.model.dto.sprint;

import org.projectmanagement.model.entity.Project;
import org.projectmanagement.model.enums.SprintStatus;

import java.sql.Date;

public record SprintCreateDto(
        Integer project_id,
        String name,
        String goal,
        Date start_date,
        Date end_date,
        Integer estimated_velocity,
        SprintStatus status

) {
}
