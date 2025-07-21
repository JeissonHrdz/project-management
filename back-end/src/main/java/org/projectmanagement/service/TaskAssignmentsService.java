package org.projectmanagement.service;

import org.projectmanagement.model.dto.task_assignment.TaskAssignmentCreateDto;
import org.projectmanagement.model.dto.task_assignment.TaskAssignmentResponseDto;

public interface TaskAssignmentsService {
    TaskAssignmentResponseDto assignTaskToUser(TaskAssignmentCreateDto taskAssignmentCreateDto);
}
