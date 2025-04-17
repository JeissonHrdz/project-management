package org.projectmanagement.service;

import org.projectmanagement.model.dto.project.ProjectCreateDto;
import org.projectmanagement.model.entity.Project;

public interface ProjectService {

    public Project createProject(ProjectCreateDto project);
}
