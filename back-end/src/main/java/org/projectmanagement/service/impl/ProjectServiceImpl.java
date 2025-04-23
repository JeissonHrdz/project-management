package org.projectmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.project.ProjectCreateDto;
import org.projectmanagement.model.dto.project.ProjectReadDto;
import org.projectmanagement.model.dto.project.ProjectResponseDto;
import org.projectmanagement.model.entity.Project;
import org.projectmanagement.model.mapper.ProjectMapper;
import org.projectmanagement.repository.ProjectRepository;
import org.projectmanagement.service.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl  implements ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    private final ProjectMapper projectMapper;

    private static final Logger log = LoggerFactory.getLogger(ProjectServiceImpl.class);

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
    public List<ProjectReadDto> getProjects(String scrum_master_id) {

        List<Project> projects = projectRepository.getProjectsByScrumMasterId(scrum_master_id);

        if (projects.isEmpty()) {
            return List.of();
        }

        List<ProjectReadDto> projectDto = projects.stream()//el stream sirive para recorrer la lista de proyectos y mapearlos
                .map(project -> new ProjectReadDto(
                        project.getProject_id(),
                        project.getName(),
                        project.getDescription(),
                        project.getProduct_owner_id(),
                        project.getScrum_master_id(),
                        project.getStart_date(),
                        project.getEstimated_end_date(),
                        project.getActual_end_date(),
                        project.getDefinition_of_done(),
                        project.getStatus()
                ))
                .collect(Collectors.toList());

        return projectDto;
    }

    @Override
    public ProjectResponseDto updateProject(int id, Map<String, Object> updates) {
        Optional<Project> project = projectRepository.findById(id);
        updates.forEach((key, value) -> {
            switch (key) {
                case "name" -> project.get().setName((String) value);
                case "description" -> project.get().setDescription((String) value);
                case "product_owner_id" -> project.get().setProduct_owner_id((String) value);
                case "scrum_master_id" -> project.get().setScrum_master_id((String) value);
                case "start_date" -> project.get().setStart_date((Date) value);
                case "estimated_end_date" -> project.get().setEstimated_end_date((Date) value);
                case "actual_end_date" -> project.get().setActual_end_date((Date) value);
                case "definition_of_done" -> project.get().setDefinition_of_done((String) value);
                case "status" -> project.get().setStatus((String) value);
                default -> throw new IllegalArgumentException("Invalid key: " + key);
            }
        });

        return projectMapper.toDto(projectRepository.save(project.get()));

    }
}
