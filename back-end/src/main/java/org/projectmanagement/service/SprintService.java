package org.projectmanagement.service;

import org.projectmanagement.model.dto.sprint.SprintCreateDto;
import org.projectmanagement.model.dto.sprint.SprintReadDto;
import org.projectmanagement.model.dto.sprint.SprintResponseDto;

import java.util.List;
import java.util.Map;

public interface SprintService {
    public SprintResponseDto createSprint(SprintCreateDto sprintCreateDto);

    public List<SprintReadDto> getSprintsByProjectId(Integer project_id);

    public SprintResponseDto updateSprint(int id, Map<String, Object> updates);

    public SprintReadDto getSprintById(Integer sprint_id);

    public void deleteSprint(Integer sprint_id);
}
