package org.projectmanagement.controller;


import lombok.AllArgsConstructor;
import org.projectmanagement.model.dto.task_assignment.TaskAssignmentCreateDto;
import org.projectmanagement.model.dto.task_assignment.TaskAssignmentResponseDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.RoleService;
import org.projectmanagement.service.TaskAssignmentsService;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.AccessDeniedException;


@RestController
@RequestMapping("project/{project_id}/sprint/{sprint_id}/task/{task_id}")
@AllArgsConstructor
public class TaskAssignmentController {


    private final TaskAssignmentsService taskAssignmentService;
    private final RoleService roleService;

    @RequestMapping("/assign")
    public ResponseEntity<?> assignTaskToUser(@RequestBody TaskAssignmentCreateDto taskAssignmentCreateDto) {
        if (!roleService.hasPermission("sprints", "create")) {
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



}
