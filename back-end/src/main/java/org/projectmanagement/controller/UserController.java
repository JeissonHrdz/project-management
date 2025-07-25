package org.projectmanagement.controller;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.user.UserReadDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.RoleService;
import org.projectmanagement.service.UserService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:4500"})
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    @RequestMapping("/find-email")
    public ResponseEntity<?> registerUser(@Param("email") String email) {
        if (!roleService.hasPermission("users", "read")) {
            throw new AccessDeniedException("You do not have permission to access this resource");
        }
        try {
            List<String> emails = userService.findUserEmail(email);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Users retrieved successfully")
                    .object(emails)
                    .build(),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @RequestMapping("/users-task")
    public ResponseEntity<?> getAllUsersByTaskAssignment( @Param("task_id") Integer task_id) {
        if (!roleService.hasPermission("users", "read")) {
            throw new AccessDeniedException("You do not have permission to access this resource");
        }
        try {
            List<UserReadDto> users = userService.findAllUsersAssignedTasks(task_id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Users retrieved successfully")
                    .object(users)
                    .build(),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST
            );
        }
    }
}

