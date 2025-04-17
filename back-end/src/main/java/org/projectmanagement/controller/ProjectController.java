package org.projectmanagement.controller;

import org.projectmanagement.model.dto.project.ProjectCreateDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project")
public class ProjectController {

    public ResponseEntity<?> createProject(@RequestBody ProjectCreateDto projectCreateDto) {
            
        return null;
    }
}
