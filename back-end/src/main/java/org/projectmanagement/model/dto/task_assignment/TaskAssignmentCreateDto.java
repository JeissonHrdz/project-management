package org.projectmanagement.model.dto.task_assignment;

public record TaskAssignmentCreateDto(
        Integer task_id,
        String assignment_type,
        String email
) {
}
