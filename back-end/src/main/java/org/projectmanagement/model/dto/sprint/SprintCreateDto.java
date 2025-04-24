package org.projectmanagement.model.dto.sprint;

import java.sql.Date;

public record SprintCreateDto(
        Integer project_id,
        String name,
        String goal,
        Date start_date,
        Date end_date,
        Integer estimated_velocity
) {
}
