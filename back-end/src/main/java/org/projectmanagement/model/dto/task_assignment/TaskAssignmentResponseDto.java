package org.projectmanagement.model.dto.task_assignment;

import java.sql.Timestamp;

public record TaskAssignmentResponseDto(
        Integer task_id,
        String user_id,
        String assignment_type,
        Timestamp assignedAt
) {}

