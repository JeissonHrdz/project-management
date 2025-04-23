package org.projectmanagement.controller;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.project.ProjectCreateDto;
import org.projectmanagement.model.dto.project.ProjectReadDto;
import org.projectmanagement.model.dto.project.ProjectResponseDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private static final Logger log = LoggerFactory.getLogger(ProjectController.class);

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
    public ResponseEntity<?> getProjects(@RequestParam String scrum_master_id) {
        try{

            List<ProjectReadDto> getProjects = projectService.getProjects(scrum_master_id);
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

    @PatchMapping(value = "/update/{id}")
    public ResponseEntity<?> updateProject(@PathVariable int id, @RequestBody Map<String, Object> updates) {
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
 }
