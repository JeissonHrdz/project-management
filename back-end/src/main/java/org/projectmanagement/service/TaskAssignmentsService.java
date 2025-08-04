package org.projectmanagement.service;

import org.projectmanagement.model.dto.task_assignment.TaskAssignmentCreateDto;
import org.projectmanagement.model.dto.task_assignment.TaskAssignmentResponseDto;

import java.util.List;

public interface TaskAssignmentsService {

    TaskAssignmentResponseDto assignTaskToUser(TaskAssignmentCreateDto taskAssignmentCreateDto);
    List<TaskAssignmentResponseDto> geTaskAssignmentsByTaskId(Integer task_id);
    void unassignTaskToUser(Integer task_id, String user_id);

}
