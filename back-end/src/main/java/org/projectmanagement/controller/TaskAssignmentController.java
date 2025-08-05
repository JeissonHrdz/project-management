package org.projectmanagement.controller;


import lombok.AllArgsConstructor;
import org.projectmanagement.model.dto.task_assignment.TaskAssignmentCreateDto;
import org.projectmanagement.model.dto.task_assignment.TaskAssignmentResponseDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.RoleService;
import org.projectmanagement.service.TaskAssignmentsService;
import org.springframework.dao.DataAccessException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;


@RestController
@RequestMapping("project/{project_id}/sprint/{sprint_id}/task/{task_id}")
@AllArgsConstructor
public class TaskAssignmentController {


    private final TaskAssignmentsService taskAssignmentService;
    private final RoleService roleService;

    @RequestMapping("/assign")
    public ResponseEntity<?> assignTaskToUser(@RequestBody TaskAssignmentCreateDto taskAssignmentCreateDto) {
        if (!roleService.hasPermission("tasks", "create")) {
            throw new AccessDeniedException("Access Denied");
        }
        try{
            TaskAssignmentResponseDto assignTaskToUser = taskAssignmentService.assignTaskToUser(taskAssignmentCreateDto);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Task assigned successfully")
                    .object(assignTaskToUser)
                    .build(),
                    HttpStatus.CREATED);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/tasks-assigned")
    public ResponseEntity<?> getTasksAssignedByTaskId( @PathVariable Integer task_id) {
        if (!roleService.hasPermission("tasks", "read")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
            List<TaskAssignmentResponseDto> getTasksAssignedByTaskId = taskAssignmentService.geTaskAssignmentsByTaskId(task_id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Tasks retrieved successfully")
                    .object(getTasksAssignedByTaskId)
                    .build(),
                    HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/unassign")
    public ResponseEntity<?> unassignTaskToUser(@PathVariable Integer task_id, @Param("user_id") String user_id) {
        if (!roleService.hasPermission("tasks", "create")) {
            throw new AccessDeniedException("Access Denied");
        }
        try{
            taskAssignmentService.unassignTaskToUser(task_id, user_id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Task unassigned successfully")
                    .build(),
                    HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST);
        }
    }




}
