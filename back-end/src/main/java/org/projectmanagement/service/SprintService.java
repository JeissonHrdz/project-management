package org.projectmanagement.service;

import org.projectmanagement.model.dto.sprint.SprintCreateDto;

public interface SprintService {
    void createSprint(SprintCreateDto sprintCreateDto);
}
