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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class TaskAssignmentServiceImpl  implements TaskAssignmentsService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final TaskAssignmentRepository taskAssignmentRepository;

    @Override
    public TaskAssignmentResponseDto assignTaskToUser(TaskAssignmentCreateDto taskAssignmentCreateDto) {
        TaskAssignments taskAssignments =  TaskAssignments.builder()
                .task(taskRepository.findById(taskAssignmentCreateDto.task_id()).get())
                .user(userRepository.findById(userRepository.findIdUserByEmail(taskAssignmentCreateDto.email())).get())
                .assignment_type(taskAssignmentCreateDto.assignment_type())
                .build();
        TaskAssignments savedTaskAssignments = taskAssignmentRepository.save(taskAssignments);


        return new TaskAssignmentResponseDto(
                savedTaskAssignments.getTask().getTask_id(),
                savedTaskAssignments.getUser().getUser_id(),
                savedTaskAssignments.getAssignment_type(),
                savedTaskAssignments.getAssigned_at()
        );
    }

    @Override
    public List<TaskAssignmentResponseDto> geTaskAssignmentsByTaskId(Integer task_id) {
        List<TaskAssignments> taskAssignments = taskAssignmentRepository.findTaskAssignments(task_id);
               if(taskAssignments.isEmpty()) return List.of();

               List<TaskAssignmentResponseDto> taskAssignments1 = taskAssignments.stream()
                       .map( taskAssignment -> new TaskAssignmentResponseDto(
                               taskAssignment.getTask().getTask_id(),
                               taskAssignment.getUser().getUser_id(),
                               taskAssignment.getAssignment_type(),
                               taskAssignment.getAssigned_at()
                       )).collect(Collectors.toList());
        return taskAssignments1;
    }

    @Override
    public void unassignTaskToUser(Integer task_id, String user_id) {
        taskAssignmentRepository.unassignTaskToUser(task_id, user_id);
    }
}
