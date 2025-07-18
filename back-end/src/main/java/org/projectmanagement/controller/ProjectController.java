package org.projectmanagement.controller;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.project.ProjectCreateDto;
import org.projectmanagement.model.dto.project.ProjectReadDto;
import org.projectmanagement.model.dto.project.ProjectResponseDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.ProjectService;
import org.projectmanagement.service.RoleService;
import org.projectmanagement.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/project")
@CrossOrigin(origins = {"http://localhost:4500"})
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final RoleService roleService;


    @PostMapping(value = "create")
    public ResponseEntity<?> createProject(@RequestBody ProjectCreateDto projectCreateDto) {
        if (!roleService.hasPermission("projects", "create")) {
            throw new AccessDeniedException("Access Denied");
        }

        try {
            ProjectResponseDto createProject = projectService.createProject(projectCreateDto);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Project created successfully")
                    .object(createProject)
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


    @GetMapping(value = "projects")
    public ResponseEntity<?> getProjects(@RequestParam String scrum_master_id) {
        if (!roleService.hasPermission("projects", "read")) {
            throw new AccessDeniedException("Access Denied");
        }
        try{
            List<ProjectReadDto> getProjects = projectService.getProjects(scrum_master_id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Projects retrieved successfully")
                    .object(getProjects)
                    .build(),
                    HttpStatus.OK);

        }catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getProject(@PathVariable int id) {
        if (!roleService.hasPermission("projects", "read")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
            ProjectReadDto getProject = projectService.getProject(id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Project retrieved successfully")
                    .object(getProject)
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
    public ResponseEntity<?> updateProject(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        if (!roleService.hasPermission("projects", "update")) {
            throw new AccessDeniedException("Access Denied");
        }

        try {
            ProjectResponseDto updateProject = projectService.updateProject(id, updates);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Project updated successfully")
                    .object(updateProject)
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

    @DeleteMapping(value = "/delete/{project_id}")
    public ResponseEntity<?> deleteProject(@PathVariable int project_id) {
        if (!roleService.hasPermission("projects", "delete")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
            projectService.deleteProject(project_id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Project deleted successfully")
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
