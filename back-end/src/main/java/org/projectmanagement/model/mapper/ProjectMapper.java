package org.projectmanagement.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.projectmanagement.model.dto.project.ProjectResponseDto;
import org.projectmanagement.model.dto.project.ProjectUpdateDto;
import org.projectmanagement.model.entity.Project;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    @Mapping(target = "project_id", ignore = true) // esto ignora el id de la entidad y lo ignora en el dto que se mapea
    @Mapping(target = "created_at", ignore = true)
    void updateProjectFromDto(ProjectUpdateDto projectUpdateDto,@MappingTarget Project project);
    ProjectResponseDto toDto(Project project);
}
