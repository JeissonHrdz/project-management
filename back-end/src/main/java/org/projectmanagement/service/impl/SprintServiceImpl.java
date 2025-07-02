package org.projectmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.sprint.SprintCreateDto;
import org.projectmanagement.model.dto.sprint.SprintReadDto;
import org.projectmanagement.model.dto.sprint.SprintResponseDto;
import org.projectmanagement.model.entity.Sprint;
import org.projectmanagement.model.enums.SprintStatus;
import org.projectmanagement.model.mapper.SprintMapper;
import org.projectmanagement.repository.ProjectRepository;
import org.projectmanagement.repository.SprintRepository;
import org.projectmanagement.service.SprintService;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SprintServiceImpl implements SprintService {

    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;
    private final SprintMapper sprintMapper;

    @Override
    public SprintResponseDto createSprint(SprintCreateDto sprintCreateDto) {
        Sprint sprint =  Sprint.builder()
                .project_id(projectRepository.findById(sprintCreateDto.project_id()).orElseThrow())
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
                savedSprint.getProject_id().getProject_id(),
                savedSprint.getName(),
                savedSprint.getGoal(),
                savedSprint.getStart_date(),
                savedSprint.getEnd_date(),
                savedSprint.getStatus()
        );

    }

    @Override
    public List<SprintReadDto> getSprintsByProjectId(Integer project_id) {
        List<Sprint> sprints = sprintRepository.getSprintsByProjectId(project_id);
        if (sprints.isEmpty()) {
            return List.of();
        }
        List<SprintReadDto> sprintReadDtos = sprints.stream()
                .map(sprint -> new SprintReadDto(
                        sprint.getSprint_id(),
                        sprint.getProject_id().getProject_id(),
                        sprint.getName(),
                        sprint.getGoal(),
                        sprint.getStart_date(),
                        sprint.getEnd_date(),
                        sprint.getStatus(),
                        sprint.getEstimated_velocity(),
                        sprint.getActual_velocity(),
                        sprint.getCreated_at()
                )).collect(Collectors.toList());
        return sprintReadDtos;
    }

    @Override
    public SprintResponseDto updateSprint(int id, Map<String, Object> updates) {
        updates.forEach((key, value) -> {
            System.out.println(key + ": " + value);
        });



        Optional<Sprint> sprint = sprintRepository.findById(id);
        updates.forEach((key, value) -> {
            switch (key) {
                case "name" -> sprint.get().setName((String) value);
                case "goal" -> sprint.get().setGoal((String) value);
                case "start_date" -> {
                    try{
                        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                        java.util.Date parsedDate = dateFormat.parse((String) value);
                        java.sql.Date sqlDate = new java.sql.Date(parsedDate.getTime());
                        sprint.get().setStart_date(sqlDate);
                    } catch (ParseException e) {
                        System.out.println(e.getMessage());
                    }
                }
                case "end_date" ->
                {  try{
                        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                        java.util.Date parsedDate = dateFormat.parse((String) value);
                        java.sql.Date sqlDate = new java.sql.Date(parsedDate.getTime());
                        sprint.get().setEnd_date(sqlDate);
                    } catch (ParseException e) {
                        System.out.println(e.getMessage());
                    }
                }
                case "status" -> sprint.get().setStatus((SprintStatus.valueOf((String) value)));
                case "estimated_velocity" -> sprint.get().setEstimated_velocity((Integer) value);
                case "actual_velocity" -> sprint.get().setActual_velocity((Integer) value);
                default -> throw new IllegalArgumentException("Invalid key: " + key);
            }
        });
        return  sprintMapper.toDto(sprintRepository.save(sprint.get()));
    }

    @Override
    public void deleteSprint(Integer sprint_id) {
        sprintRepository.deleteById(sprint_id);

    }
}
