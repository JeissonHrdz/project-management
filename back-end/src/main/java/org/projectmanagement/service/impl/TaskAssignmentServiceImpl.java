package org.projectmanagement.service.impl;

import lombok.AllArgsConstructor;
import org.projectmanagement.model.dto.task_assignment.TaskAssignmentCreateDto;
import org.projectmanagement.model.dto.task_assignment.TaskAssignmentResponseDto;
import org.projectmanagement.model.entity.TaskAssignments;
import org.projectmanagement.repository.TaskAssignmentRepository;
import org.projectmanagement.repository.TaskRepository;
import org.projectmanagement.repository.UserRepository;
import org.projectmanagement.service.TaskAssignmentsService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TaskAssignmentServiceImpl  implements TaskAssignmentsService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final TaskAssignmentRepository taskAssignmentRepository;

    @Override
    public TaskAssignmentResponseDto assignTaskToUser(TaskAssignmentCreateDto taskAssignmentCreateDto) {
       /* TaskAssignments taskAssignments =  TaskAssignments.builder()
                .task(taskRepository.findById(taskAssignmentCreateDto.task_id()).get())
                .user(userRepository.findId(taskAssignmentCreateDto.user_id()))
                .assignment_type(taskAssignmentCreateDto.assignment_type())
                .build();
        TaskAssignments savedTaskAssignments = taskAssignmentRepository.save(taskAssignments);


        return new TaskAssignmentResponseDto(
                savedTaskAssignments.getTask().getTask_id(),
                savedTaskAssignments.getUser().getUser_id(),
                savedTaskAssignments.getAssignment_type(),
                savedTaskAssignments.getAssigned_at()
        );*/
    return null;
    }
}
