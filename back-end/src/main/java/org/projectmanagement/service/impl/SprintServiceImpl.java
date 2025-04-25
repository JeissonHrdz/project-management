package org.projectmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.sprint.SprintCreateDto;
import org.projectmanagement.model.dto.sprint.SprintResponseDto;
import org.projectmanagement.model.entity.Sprint;
import org.projectmanagement.repository.SprintRepository;
import org.projectmanagement.service.SprintService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SprintServiceImpl implements SprintService {

    private final SprintRepository sprintRepository;

    @Override
    public SprintResponseDto createSprint(SprintCreateDto sprintCreateDto) {
        Sprint sprint =  Sprint.builder()
                .project_id(sprintCreateDto.project_id())
                .name(sprintCreateDto.name())
                .goal(sprintCreateDto.goal())
                .start_date(sprintCreateDto.start_date())
                .end_date(sprintCreateDto.end_date())
                .status(sprintCreateDto.status())
                .estimated_velocity(sprintCreateDto.estimated_velocity())
                .build();
        Sprint savedSprint = sprintRepository.save(sprint);

        return new SprintResponseDto(
                savedSprint.getSprint_id(),
                savedSprint.getProject_id(),
                savedSprint.getName(),
                savedSprint.getGoal(),
                savedSprint.getStart_date(),
                savedSprint.getEnd_date(),
                savedSprint.getStatus()
        );

    }
}
