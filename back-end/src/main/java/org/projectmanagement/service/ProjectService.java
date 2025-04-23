package org.projectmanagement.service;

import org.projectmanagement.model.dto.project.ProjectCreateDto;
import org.projectmanagement.model.dto.project.ProjectReadDto;
import org.projectmanagement.model.dto.project.ProjectResponseDto;
import java.util.List;
import java.util.Map;

public interface ProjectService {

    public ProjectResponseDto createProject(ProjectCreateDto project);
    public List<ProjectReadDto> getProjects(String scrum_master_id);
    public ProjectResponseDto updateProject(int id, Map<String, Object> updates);
}
