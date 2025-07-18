package org.projectmanagement.service.impl;

import lombok.AllArgsConstructor;
import org.projectmanagement.model.dto.task.TaskCreateDto;
import org.projectmanagement.model.dto.task.TaskReadDto;
import org.projectmanagement.model.dto.task.TaskResponseDto;
import org.projectmanagement.model.entity.Sprint;
import org.projectmanagement.model.entity.Task;
import org.projectmanagement.model.enums.TaskPriority;
import org.projectmanagement.model.enums.TaskStatus;
import org.projectmanagement.model.enums.TaskType;
import org.projectmanagement.model.mapper.TaskMapper;
import org.projectmanagement.repository.ProjectRepository;
import org.projectmanagement.repository.SprintRepository;
import org.projectmanagement.repository.TaskRepository;
import org.projectmanagement.service.TaskService;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final SprintRepository sprintRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Override
    public TaskResponseDto createTask(TaskCreateDto taskCreateDto) {
  
        Task task = Task.builder()
                .title(taskCreateDto.title())
                .description(taskCreateDto.description())
                .sprint_id(sprintRepository.findById(taskCreateDto.sprint_id()).get())
                .project_id(projectRepository.findById(taskCreateDto.project_id()).get())
                .backlog_item_id(taskCreateDto.backlog_item_id())
                .status(taskCreateDto.status())
                .priority(taskCreateDto.priority())
                .type(taskCreateDto.type())
                .story_points(taskCreateDto.story_points())
                .estimate_hours(taskCreateDto.estimated_hours())
                .blockers(taskCreateDto.blockers())
                .start_date(taskCreateDto.start_date())
                .end_date(taskCreateDto.end_date())
                .build();
        Task savedTask = taskRepository.save(task);

        return new TaskResponseDto(
                savedTask.getTask_id(),
                savedTask.getSprint_id().getSprint_id(),
                savedTask.getTitle(),
                savedTask.getDescription(),
                savedTask.getStatus(),
                savedTask.getPriority(), 
                savedTask.getType(),
                savedTask.getEstimate_hours(),
                savedTask.getStory_points(),
                savedTask.getStart_date(),
                savedTask.getEnd_date()
        );
    }

    @Override
    public List<TaskReadDto> getTaskBySprintId(Integer sprint_id) {
        List<Task> tasks = taskRepository.getTasksBySprintId(sprint_id);
        if(tasks.isEmpty()) return List.of();
        List<TaskReadDto> taskReadDtos = tasks.stream().map(task -> new TaskReadDto(
                task.getTask_id(),
                task.getTitle(),
                task.getDescription(),
                task.getBacklog_item_id(),
                task.getProject_id().getProject_id(),
                task.getSprint_id().getSprint_id(),
                task.getStatus(),
                task.getPriority(),
                task.getType(),
                task.getStory_points(),
                task.getEstimate_hours(),
                task.getActual_hours(),
                task.getBlockers(),
                task.getStart_date(),
                task.getEnd_date()
        )).toList();
        return taskReadDtos;

    }

    @Override
    public TaskReadDto getTaskById(Integer task_id) { 
        Optional<Task> task = taskRepository.findById(task_id);
        if(task.isEmpty()) return null;
        return new TaskReadDto(
                task.get().getTask_id(),
                task.get().getTitle(),
                task.get().getDescription(),
                task.get().getBacklog_item_id(),
                task.get().getProject_id().getProject_id(),
                task.get().getSprint_id().getSprint_id(),
                task.get().getStatus(),
                task.get().getPriority(),
                task.get().getType(),
                task.get().getStory_points(),
                task.get().getEstimate_hours(),
                task.get().getActual_hours(),
                task.get().getBlockers(),
                task.get().getStart_date(),
                task.get().getEnd_date()
        );
       
    }

    @Override
    public TaskResponseDto updateTask(int id, Map<String, Object> updates) {
       
        System.out.println("updates: " + updates + " id: " + id);
        Optional<Task> task = taskRepository.findById(id);      
        updates.forEach((key, value) -> {
            switch (key) {
                case "title" -> task.get().setTitle((String) value);
                case "description" -> task.get().setDescription((String) value);
                case "backlog_item_id" -> task.get().setBacklog_item_id((Integer) value);
                case "sprint_id" -> task.get().setSprint_id((Sprint) value);
                case "status" -> task.get().setStatus(TaskStatus.valueOf((String) value));
                case "priority" -> task.get().setPriority(TaskPriority.valueOf((String) value));
                case "type" -> task.get().setType(TaskType.valueOf((String) value));
                case "story_points" -> task.get().setStory_points((Integer) value);
                case "estimated_hours" -> task.get().setEstimate_hours(Double.parseDouble(value.toString()));
                case "actual_hours" -> task.get().setActual_hours(Double.parseDouble(value.toString()));
                case "blockers" -> task.get().setBlockers((String) value);
                case "start_date" -> task.get().setStart_date(Timestamp.valueOf(value.toString()+" 00:00:00"));
                case "end_date" -> task.get().setEnd_date(Timestamp.valueOf(value.toString()+" 00:00:00"));
                default -> throw new IllegalArgumentException("Invalid key: " + key);
            }
        });
         return taskMapper.toDto(taskRepository.save(task.get()));
    }

    @Override
    public void deleteTask(Integer task_id) {
        taskRepository.deleteById(task_id);

    }
}
