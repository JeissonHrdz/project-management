package org.projectmanagement.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.projectmanagement.model.dto.backlog.BacklogResponseDto;
import org.projectmanagement.model.dto.backlog.BacklogUpdateDto;
import org.projectmanagement.model.entity.Backlog;
import org.projectmanagement.model.entity.Project;

@Mapper(componentModel = "spring")
public interface BacklogMapper {

    @Mapping(target = "item_id", ignore = true)
    @Mapping(target = "created_at", ignore = true)
    @Mapping(target = "project_id", ignore = true)
    void updateBacklogFromDto(BacklogUpdateDto backlogUpdateDto, @MappingTarget Backlog backlog);


    @Mapping(target = "epic_id", source = "epic.item_id")
    BacklogResponseDto toDto(Backlog backlog);

    default Integer map(Project project) {
        return project != null ? project.getProject_id() : null;
    }

    default Project map(Integer project_id) {
        if (project_id == null) {
            return null;
        }
        Project project = new Project();
        project.setProject_id(project_id);
        return project;
    }

    default Integer map(Backlog epic) {
        return epic != null ? epic.getItem_id() : null;
    }


}
