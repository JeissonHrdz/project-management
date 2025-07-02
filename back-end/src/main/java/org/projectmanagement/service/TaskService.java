package org.projectmanagement.service;

import org.projectmanagement.model.dto.task.TaskCreateDto;
import org.projectmanagement.model.dto.task.TaskReadDto;
import org.projectmanagement.model.dto.task.TaskResponseDto;


import java.util.List;
import java.util.Map;

public interface TaskService {

    TaskResponseDto createTask(TaskCreateDto taskCreateDto);

    List<TaskReadDto> getTaskBySprintId(Integer sprint_id);

    TaskResponseDto updateTask(int id, Map<String, Object> updates);

    void deleteTask(Integer task_id);
}



