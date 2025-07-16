package org.projectmanagement.controller;

import lombok.AllArgsConstructor;
import org.projectmanagement.model.dto.task.TaskCreateDto;
import org.projectmanagement.model.dto.task.TaskReadDto;
import org.projectmanagement.model.dto.task.TaskResponseDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.RoleService;
import org.projectmanagement.service.TaskService;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("project/{project_id}/sprint/{sprint_id}/task")
@AllArgsConstructor
public class TaskController {

    private final RoleService roleService;
    private final TaskService taskService;


    @PostMapping("create")
    public ResponseEntity<?> createTask(@RequestBody TaskCreateDto taskCreateDto) {
        if (!roleService.hasPermission("tasks", "create")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
            TaskResponseDto createTask = taskService.createTask(taskCreateDto);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Task created successfully")
                    .object(createTask)
                    .build(), HttpStatus.CREATED);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "tasks")
    public ResponseEntity<?> getTasks(@PathVariable Integer sprint_id) {     
        if (!roleService.hasPermission("tasks", "read")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
            List<TaskReadDto> getTasks = taskService.getTaskBySprintId(sprint_id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Tasks retrieved successfully")
                    .object(getTasks)
                    .build(),
                    HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST);
        }

    }

       @GetMapping(value = "/{task_id}")
    public ResponseEntity<?> getTask(@PathVariable Integer task_id) {     
        if (!roleService.hasPermission("tasks", "read")) {
            throw new AccessDeniedException("Access Denied");
        }
        try { 
            TaskReadDto getTask = taskService.getTaskById(task_id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Task retrieved successfully")
                    .object(getTask)
                    .build(),
                    HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST);
        }

    }

    @PatchMapping(value = "/update/{id}")
    public ResponseEntity<?> updateTask(@PathVariable int id, @RequestBody Map<String, Object> updates) {

        updates.forEach((key, value) -> {          
              System.err.println(key + " : " + value);            
        });

        if(!roleService.hasPermission("tasks", "update")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
            TaskResponseDto updateTask = taskService.updateTask(id, updates);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Task updated successfully")
                    .object(updateTask)
                    .build(),
                    HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Integer id) {
        if (!roleService.hasPermission("tasks", "delete")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
            taskService.deleteTask(id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Task deleted successfully")
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
