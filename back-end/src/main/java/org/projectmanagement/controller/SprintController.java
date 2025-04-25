package org.projectmanagement.controller;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.sprint.SprintCreateDto;
import org.projectmanagement.model.dto.sprint.SprintResponseDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.RoleService;
import org.projectmanagement.service.SprintService;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("project/{project_id}/sprint")
@RequiredArgsConstructor
public class SprintController {

    private final SprintService sprintService;
    private final RoleService roleService;

    @PostMapping("create")
    public ResponseEntity<?> createSprint(@RequestBody SprintCreateDto sprintCreateDto){
        if (!roleService.hasPermission("sprints", "create")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
            SprintResponseDto createSprint = sprintService.createSprint(sprintCreateDto);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Sprint created successfully")
                    .object(createSprint)
                    .build(),
                    HttpStatus.CREATED);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST
            );
        }
    }
}
