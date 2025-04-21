package org.projectmanagement.controller;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.project.ProjectCreateDto;
import org.projectmanagement.model.dto.project.ProjectReadDto;
import org.projectmanagement.model.dto.project.ProjectResponseDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.ProjectService;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping(value = "create")
    public ResponseEntity<?> createProject(@RequestBody ProjectCreateDto projectCreateDto) {
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
    public ResponseEntity<?> getProjects(@RequestBody String user_id) {
        try{
            ArrayList<ProjectReadDto> getProjects = projectService.getProjects(user_id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Projects retrieved successfully")
                    .object(getProjects.size())
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
 }
