package org.projectmanagement.controller;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.sprint.SprintCreateDto;
import org.projectmanagement.model.dto.sprint.SprintReadDto;
import org.projectmanagement.model.dto.sprint.SprintResponseDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.RoleService;
import org.projectmanagement.service.SprintService;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("project/{project_id}/sprint")
@RequiredArgsConstructor
public class SprintController {

    private final SprintService sprintService;
    private final RoleService roleService;

    @PostMapping("create")
    public ResponseEntity<?> createSprint(@RequestBody SprintCreateDto sprintCreateDto) {
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

    @GetMapping(value = "sprints")
    public ResponseEntity<?> getSprints(@PathVariable int project_id) {
        if (!roleService.hasPermission("sprints", "read")) {
            throw new AccessDeniedException("Access Denied");
        }

        try {
            List<SprintReadDto> getSprints = sprintService.getSprintsByProjectId(project_id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Sprints retrieved successfully")
                    .object(getSprints)
                    .build(),
                    HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @PatchMapping(value = "/update/{id}")
    public ResponseEntity<?> updateSprint(@PathVariable int id, @RequestBody Map<String, Object> updates) {
       

        if (!roleService.hasPermission("sprints", "update")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {

            SprintResponseDto updateSprint = sprintService.updateSprint(id, updates);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Sprint updated successfully")
                    .object(updateSprint)
                    .build(),
                    HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteSprint(@PathVariable Integer id) {
        if (!roleService.hasPermission("sprints", "delete")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
            sprintService.deleteSprint(id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Sprint deleted successfully")
                    .build(),
                    HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST
            );
        }
    }
}

