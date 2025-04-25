package org.projectmanagement.service;

import org.projectmanagement.model.dto.sprint.SprintCreateDto;
import org.projectmanagement.model.dto.sprint.SprintResponseDto;

public interface SprintService {
     SprintResponseDto createSprint(SprintCreateDto sprintCreateDto);
}
