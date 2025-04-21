package org.projectmanagement.service;

import org.projectmanagement.model.dto.project.ProjectCreateDto;
import org.projectmanagement.model.dto.project.ProjectReadDto;
import org.projectmanagement.model.dto.project.ProjectResponseDto;
import org.projectmanagement.model.entity.Project;

import java.util.ArrayList;

public interface ProjectService {

    public ProjectResponseDto createProject(ProjectCreateDto project);
    public ArrayList<ProjectReadDto> getProjects(String user_id);
}
