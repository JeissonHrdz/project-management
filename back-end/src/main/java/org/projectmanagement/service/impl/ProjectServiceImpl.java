package org.projectmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.project.ProjectCreateDto;
import org.projectmanagement.model.dto.project.ProjectReadDto;
import org.projectmanagement.model.dto.project.ProjectResponseDto;
import org.projectmanagement.model.entity.Project;
import org.projectmanagement.repository.ProjectRepository;
import org.projectmanagement.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl  implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public ProjectResponseDto createProject(ProjectCreateDto projectCreateDto) {
        Project project = Project.builder()
                .name(projectCreateDto.name())
                .description(projectCreateDto.description())
                .product_owner_id(projectCreateDto.product_owner_id())
                .scrum_master_id(projectCreateDto.scrum_master_id())
                .start_date(projectCreateDto.start_date())
                .estimated_end_date(projectCreateDto.estimated_end_date())
                .build();
        Project savedProject = projectRepository.save(project);

        return new ProjectResponseDto(
                savedProject.getProject_id(),
                savedProject.getName(),
                savedProject.getDescription(),
                savedProject.getProduct_owner_id(),
                savedProject.getScrum_master_id(),
                savedProject.getStart_date(),
                savedProject.getEstimated_end_date()
        );
    }

    @Override
    public ArrayList<ProjectReadDto> getProjects(String user_id) {
        return projectRepository.getProjectsByScrumMasterId(user_id);
    }
}
