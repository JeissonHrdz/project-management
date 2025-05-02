package org.projectmanagement.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.projectmanagement.model.dto.backlog.BacklogResponseDto;
import org.projectmanagement.model.dto.backlog.BacklogUpdateDto;
import org.projectmanagement.model.entity.Backlog;

@Mapper(componentModel = "spring")
public interface BacklogMapper {

    @Mapping(target = "item_id", ignore = true)
    @Mapping(target = "created_at", ignore = true)
    @Mapping(target = "project_id", ignore = true)
    void updateBacklogFromDto(BacklogUpdateDto backlogUpdateDto, @MappingTarget Backlog backlog);
    BacklogResponseDto toDto(Backlog backlog);
}
